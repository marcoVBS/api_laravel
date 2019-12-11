<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\StoreUpdateProductFormRequest;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{

    /**
     * Propriedade que armazena objeto
     *
     * @var Product
     */
    protected $product;
    private $path = 'products';

    /**
     * Construtor criado para atribuir objeto Product a propriedade product 
     * e evitar redundância de código
     *
     * @param Product $product
     */
    public function __construct(Product $product)
    {
        /**
         * Protege os recursos do controller contra usuários não tenticados pelo JWT
         */
        // $this->middleware('auth:api', ['except' => ['login']]);
        // $this->middleware('auth:api');
        
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $products = $this->product->getResults($request->all());

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreUpdateProductFormRequest $request)
    {
        $data = $request->all();

        if($request->hasFile('image') && $request->file('image')->isValid()){
            $name = kebab_case($request->name);
            $extension = $request->file('image')->extension();

            $nameFile = "{$name}.{$extension}";

            $data['image'] = $nameFile;

            $upload = $request->file('image')->storeAs($this->path, $nameFile);

            if(!$upload)
                return response()->json(['error' => 'Fail Upload'], 500);
        }

        $product = $this->product->create($data);

        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        if(!$product = $this->product->find($id))
            return response()->json(['error' => 'Not found!'], 404);

        //$product->category = $product->category()->get()->first();
        $product->category = $product->category;

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(StoreUpdateProductFormRequest $request, $id)
    {
        if(!$product = $this->product->find($id))
            return response()->json(['error' => 'Not found!'], 404);

        $data = $request->all();

        if($request->hasFile('image') && $request->file('image')->isValid()){

            if($product->image){
                if(Storage::exists("{$this->path}/{$product->image}")){
                    Storage::delete("{$this->path}/{$product->image}");
                }
            }


            $name = kebab_case($request->name);
            $extension = $request->file('image')->extension();

            $nameFile = "{$name}.{$extension}";

            $data['image'] = $nameFile;

            $upload = $request->file('image')->storeAs('products', $nameFile);

            if(!$upload)
                return response()->json(['error' => 'Fail Upload'], 500);
        }

        $product->update($data);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        if(!$product = $this->product->find($id))
            return response()->json(['error' => 'Not found!'], 404);

        if($product->image){
            if(Storage::exists("{$this->path}/{$product->image}")){
                Storage::delete("{$this->path}/{$product->image}");
            }
        }

        $product->delete();

        return response()->json([], 204);
    }
}
