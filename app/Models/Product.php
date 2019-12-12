<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name', 'description', 'image', 'category_id'];

    public function getResults($data)
    {
        if (!isset($data['filter']) && !isset($data['name']) && !isset($data['description']) && !isset($data['category_id']))
            return $this->orderBy('id', 'DESC')->paginate(10);

        return $this->where(function($query) use ($data){
                if(isset($data['filter'])){
                    $filter = $data['filter'];
                    $query->where('name','LIKE', "%{$filter}%");
                    $query->orWhere('description','LIKE', "%{$filter}%");
                }

                if(isset($data['name'])){
                    $query->where('name', $data['name']);
                }

                if(isset($data['category_id'])){
                    $query->where('category_id', $data['category_id']);
                }

                if(isset($data['description'])){
                    $description = $data['description'];
                    $query->where('description','LIKE', "%{$description}%");
                }

            })
            ->orderBy('id', 'DESC')
            ->paginate(10);
            
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

}
