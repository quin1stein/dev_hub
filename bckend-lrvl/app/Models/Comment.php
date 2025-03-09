<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Comment extends Model
{ 
    use HasFactory, SoftDeletes;
    protected $fillable = ['user_id', 'post_id', 'content'];
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function post() {
        return $this->belongsTo(Post::class);
    }

    public function votes() {
        return $this->morphMany(Vote::class, 'votable');
    }
}
