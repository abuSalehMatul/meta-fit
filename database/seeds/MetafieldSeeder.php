<?php

use Illuminate\Database\Seeder;

class MetafieldSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [
            "Fits true to size, take your normal size",

            "Fits true to size, however those who are between sizes should take the smaller size.",

            "Designed for a slim fit",

            "Those with a curvy figure may wish to take the next size up.",

            "Designed for a slightly loose fit",

            "Designed for a loose fit",

            "Designed for a draped silhouette, cut to be worn very loose",

            "Those with a large bust may wish to take the next size up",

            "Those with a petite frame may wish to take the next size down",

            "Intended for an oversized fit, cut to be worn loose.",

            "Adjustable drawstring at waist for a flexible fit",

            "Adjustable drawstring at hem for a flexible fit",

            "Slightly long in length",

            "May tie or belt at the waist for an adjustable fit",

            "Fits small to size, take one size larger than normal",

            "Fits large to size, take one size smaller than normal",

            "Comfortably fits those who are a size XS - M",

            "Comfortably fits those who are a size XS - L"
        ];
        foreach($fields as $field){
            App\MetaField::create(['name' => $field]);
        }
    }
}
