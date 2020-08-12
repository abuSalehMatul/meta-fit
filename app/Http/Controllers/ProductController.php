<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Shop;
use App\Service\ApiService;
use App\MetaField;
use App\Product;
use App\Token;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{


    public function __construct(Shop $shopModel, ApiService $apiService)
    {
        $this->shopModel = $shopModel;
        $this->apiService = $apiService;
    }

    public function getProduct(Request $request)
    {
        $shop = Shop::first();
        $token = Token::first();
        $data = [];
        // $pagination = '';
        // $pagination = $request->get('pagination');
        return $data['all_products'] = $this->apiService->getProduct($shop->my_shopify_domain, $token->access_token);
    }

    public function deleteMeta(Request $request)
    {
        $product = Product::where('product_id', $request->product_id)->first();
        $shop = Shop::first();
        $token = Token::first();
        $this->apiService->metaDelete($request->product_id, $shop->my_shopify_domain, $token->access_token, $product->meta_filed);
        return $product->delete();
    }

    public function getAppProduct()
    {
        return Product::where('status', 'active')->get();
    }

    public function updateMeta(Request $request)
    {
        $product = Product::where('product_id', $request->product_id)->first();
        if ($product) {
            $product->meta_filed = $request->meta;
            $product->save();
        } else {
            $product = new Product();
            $product->meta_filed = $request->meta;
            $product->product_id = $request->product_id;
            $product->save();
        }
        $shop = Shop::first();
        $token = Token::first();
        $this->apiService->metaService($request->product_id, $shop->my_shopify_domain, $token->access_token, $request->meta);
        return true;
    }
}
