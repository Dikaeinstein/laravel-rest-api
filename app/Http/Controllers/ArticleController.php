<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Article;
use App\User;

class ArticleController extends Controller
{
    /**
     * View all articles owned by user
     *
     * @param Request $request
     *
     * @return array Array of articles
     */
    public static function index(Request $request)
    {
        $articles = Article::where('user_id', '=', $request->user()->id)
            ->get();
        return response()->json([
            "articles" => $articles,
            "status" => "success",
        ]);
    }

    /**
     * View one article
     * 
     * @param int $id 
     *
     * @return Article
     */
    public static function show($id)
    {
        $article = Article::find($id);

        return response()->json([
            "article" => $article,
            "status" => "success",
        ]);
    }

    /**
     * Save new article
     *
     * @param Request $request
     *
     * @return Article The newly created article
     */
    public static function store(Request $request)
    {
        $article = array_merge($request->all(), [
            'user_id' => $request->user()->id
        ]);

        $new_article = Article::create($article);
        return response()->json([
            "article" => $new_article,
            "status" => "success",
        ]);
    }

    /**
     * Update an article
     * 
     * @param Request $request
     * @param Article $article
     *
     * @return Article Updated article
     */
    public static function update(Request $request, Article $article)
    {
        $article->update($request->all());

        return response()->json([
            "article" => $article,
            "status" => "success",
        ]);
    }

    /**
     * Delete article
     *
     * @param int $id 
     */
    public static function delete($id)
    {
        $article = Article::findOrFail($id);
        $article->delete();

        return 204;
    }
}
