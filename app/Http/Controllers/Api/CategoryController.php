<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\StoreUpdateCategoryFormRequest;

class CategoryController extends Controller
{
    /**
     * Propriedade que armazena objeto
     *
     * @var Category
     */
    private $category;

    /**
     * Construtor criado para atribuir objeto Category a propriedade category 
     * e evitar redundância de código
     *
     * @param Category $category
     */
    public function __construct(Category $category)
    {
        /**
         * Protege os recursos do controller contra usuários não tenticados pelo JWT
         */
        // $this->middleware('auth:api', ['except' => ['login']]);
        $this->middleware('auth:api');

        $this->category = $category;
    }

    /**
     * Método que retorna todas as categorias ou alguma, dependendo do filtro
     * detalhe: o filtro e testado e aplicado no Modelo (Boas práticas)
     *
     * @param Request $request
     * @return Array $categories
     */
    public function index(Request $request)
    {
        $categories = $this->category->getResults($request->name);

        return response()->json($categories, 200);
    }

    /**
     * Método que cadastra uma categoria
     * Usa validação através de form request criado
     *
     * @param StoreUpdateCategoryFormRequest $request
     * @return Category $category
     */
    public function store(StoreUpdateCategoryFormRequest $request)
    {
        $category = $this->category->create($request->all());

        return response()->json($category, 201);
    }

    /**
     * Método de edição de categoria
     * Usa validação através de form request criado
     *
     * @param StoreUpdateCategoryFormRequest $request
     * @param $id
     * @return Category $category
     */
    public function update(StoreUpdateCategoryFormRequest $request, $id)
    {
        if(!$category = $this->category->find($id))
            return response()->json(['error' => 'Not Found'], 404);

        $category->update($request->all());

        return response()->json($category);
    }

    /**
     * Delete uma categoria do banco de dados
     *
     * @param $id
     * @return Array
     */
    public function destroy($id)
    {
        if(!$category = $this->category->find($id))
            return response()->json(['error' => 'Not Found'], 404);

        $category->delete();

        return response()->json([], 204);
    }

    /**
     * Retornar detalhes de uma determinada categoria
     *
     * @param $id
     * @return Category
     */
    public function show($id)
    {
        if(!$category = $this->category->find($id))
            return response()->json(['error' => 'Not Found'], 404);

        return response()->json($category, 200);
    }

    /**
     * Retorna os produtos de uma determinada categoria
     *
     * @param $id
     * @return array
     */
    public function products($id)
    {
        if(!$category = $this->category->find($id))
            return response()->json(['error' => 'Not Found'], 404);

        $products = $category->products()->paginate(10);

        return response()->json([
            'category' => $category,
            'products' => $products
        ]);
    }

}
