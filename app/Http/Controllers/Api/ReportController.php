<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product;

class ReportController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api');
    }

    public function products(Product $product)
    {
        $products = $product->get()->groupBy(function($query){
            return $query->created_at->format('m');
        });

        $labels = [];
        $datasets = [];

        foreach($products as $product){
            $labels[] = "Mês {$product[0]->created_at->format('m')}";
            $datasets[] = count($product);
        }

        return response()->json([
            'labels' => $labels,
            'datasets' => $datasets
        ]);
    }
}
