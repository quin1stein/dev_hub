<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
class Vote extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ["user_id", "votable_id", 'votable_type', 'vote_type'];
    protected $casts = ['deleted_at' => 'datetime',];
    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function votable() {
        return $this->morphTo();
    }
    public static function toggleVote($userId, $votable, $type) {
        $existingVote = self::where('user_id', $userId)
            ->where('votable_id', $votable->id)
            ->where('votable_type', get_class($votable))
            ->first();
        
        if ($existingVote) {
            return $existingVote->vote_type === $type 
                ? $existingVote->delete() 
                : tap($existingVote)->update(['vote_type' => $type]);
        }
        
        return self::create([
            'user_id' => $userId,
            'votable_id' => $votable->id,
            'votable_type' => get_class($votable),
            'vote_type' => $type // 'upvote' or 'downvote'
        ]);
    }
    
}
