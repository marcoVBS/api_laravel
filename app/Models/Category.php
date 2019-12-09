<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    /**
     * Definição das propriedades que podem ser inseridas
     * Obrigatório no tipo de sitaxe de inserção, usada no controller
     *
     * @var array
     */
    protected $fillable = ['name'];

    public function getResults($name = null)
    {
        if(!$name)
            return $this->get();
        else
            return $this->where('name', 'LIKE', "%{$name}%")->get();
    }

    /**
     * Retorna os produtos de determinada categoria
     *
     * @return array
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

}
