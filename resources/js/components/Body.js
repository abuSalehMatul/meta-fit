import React, { Component } from 'react'
import { Button, Card, Layout } from "@shopify/polaris"
import MetaField from "./MetaField";
import Product from "./Product";

export class Body extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metafields: ''
        };
        this.shop = this.props.shop;
        this.getMeta();
        this.update = this.update.bind(this);
    }
    getMeta() {
        axios.get('https://apps.shapeyourshop.com/des-kohan/api/meta-fields/')
            .then((response) => {
                this.setState({
                    metafields:response.data
                });

            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }
    update() {
        let buttonSetting = JSON.parse(localStorage.getItem('aiva_buttons'));
        let pageSettings = JSON.parse(localStorage.getItem('aiva_urls'));
        axios.post(window.location.origin + '/api/update-shop/' + this.props.shop, { 'button_setting': buttonSetting, 'page_settings': pageSettings })
            .then((response) => {
               // console.log(response);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }
    render() {

        return (
            <Card.Section>
                <MetaField meta={this.state.metafields}></MetaField>
                <Product meta={this.state.metafields}></Product>
            </Card.Section>
        )
    }
}

export default Body
