import React, { Component } from 'react'
import { Select, Card, Pagination, Form, Layout, DisplayText, Badge, FormLayout, TextField, Thumbnail, Toast,Tooltip,Link, Spinner } from "@shopify/polaris"
import { times } from 'lodash';
export class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metafields: '',
            productList: [],
            appProductList: '',
            permanentProductList: '',
            key: '',
            previousPage: '',
            nextPage: '',
            currentPage: 1,
            perPage: 50,
            startPoint: 0,
            preservePoint: 0,
            toastActive: false,
            toastMarkup: '',
            loading:true
        };
        this.serverAddress = window.location.origin;
        this.getProducts();
        this.getAppProducts();
        this.handleMetaUpdate = this.handleMetaUpdate.bind(this);
    }
    componentWillReceiveProps(updatedProps) {
        this.setState({ metafields: updatedProps.meta });
    }

    handleMetaUpdate(value, productId) {
        axios.post(this.serverAddress+'/api/update-meta', { 'meta': value, 'product_id': productId })
            .then((response) => {
                this.setState({
                    toastActive: true
                })
                this.getAppProducts();
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    getAppProducts() {
        axios.get(this.serverAddress+'/api/get-app-product/')
            .then((response) => {

                let appProduct = {};
                for (let i = 0; i < response.data.length; i++) {
                    let tem = response.data[i].product_id;
                    appProduct[tem] = response.data[i].meta_filed
                }
                // console.log(appProduct)
                this.setState({
                    appProductList: appProduct,
                });

            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    getProducts() {
        axios.get(this.serverAddress+'/api/get-product')
            .then((response) => {
                console.log(response)
                this.setState({
                    productList: response.data,
                    permanentProductList: response.data,
                    loading:false,
                    //nextPage:response.data.next_page
                });

            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    }

    render() {
        //  console.log(this.state.startPoint)
        this.state.toastMarkup = this.state.toastActive ? (
            <Toast content="Fit info updated" onDismiss={() => { this.setState({ toastActive: false }) }} />
        ) : null;
        let products = [];
        let metas = [];
        let picsrc = '';
        for (let i = 0; i < this.state.metafields.length; i++) {
            metas.push(this.state.metafields[i].name);
        }
        for (let i = 0; i < this.state.productList.length; i++) {
            if (i >= this.state.startPoint && i < parseInt(this.state.startPoint + this.state.perPage)) {
                console.log(typeof (this.state.productList[i].images[0]) == 'undefined');
                if(typeof (this.state.productList[i].images[0]) == 'undefined'){
                    picsrc = "https://apps.shapeyourshop.com/des-kohan/no_image.png";
                }
                else{
                    picsrc = this.state.productList[i].images[0].src;
                }
               // console.log(picsrc)
                let fitinfo = '';
                if (this.state.appProductList[this.state.productList[i].id]) {
                    fitinfo = <span><Badge status="success">{this.state.appProductList[this.state.productList[i].id]}</Badge>
                    <span onClick={()=>{
                        axios.post(this.serverAddress+'/api/delete-meta', { 'product_id': this.state.productList[i].id })
                        .then((response) => {
                            this.setState({
                                toastActive: true
                            })
                            this.getAppProducts();
                        })
                        .catch((error) => {
                            // handle error
                            console.log(error);
                        });
                    }} style={{color:"red", cursor:'pointer'}}>&#10006;</span></span>
                }
                else {
                    fitinfo = <Badge>Fit info hasn't been set yet</Badge>;
                }
                products.push(
                    <Card.Section key={i} sectioned>
                        <div style={{ display: "flex" }}>
                            <div style={{ position: "relative", left: "0", width: "72%" }}>
                                <div style={{ float: "left" }}>
                                    <Thumbnail
                                        source={picsrc}
                                       
                                    />
                                </div>

                                <DisplayText size="small">

                                    &nbsp;{this.state.productList[i].title} <br></br>
                                    {fitinfo}

                                </DisplayText>
                            </div>
                            <div style={{ position: "relative", left: "3%", width: "26%" }}>
                                <Select
                                    label="Change fit information"
                                    options={metas}
                                    onChange={value => {
                                        this.handleMetaUpdate(value, this.state.productList[i].id)
                                    }}
                                    value={this.state.appProductList[this.state.productList[i].id]}
                                />
                            </div>
                        </div>


                        {/* <Subheading>
                        vendor: {this.state.productList[i].vendor}, &nbsp;&nbsp;
                            tag: {this.state.productList[i].tags == "" ? 'N/A' : this.state.productList[i].tags}, &nbsp;&nbsp;
                            No. of variants: {this.state.productList[i].variants.length} &nbsp;&nbsp;
                            product_type: {this.state.productList[i].product_type == "" ? 'N/A' : this.state.productList[i].product_type} &nbsp;&nbsp;
                        </Subheading> */}
                    </Card.Section>
                )
            }
        }

        let pagination = '';

        pagination = <div style={{ position: 'relative', left: "82%" }}>
            <Pagination
                label="Results"
                hasPrevious
                previousKeys={[3]}

                onPrevious={() => {
                    // this.getProducts(this.state.previousPage);
                    // this.setState({
                    //     currentPage: this.state.currentPage - 1 > 0 ? this.state.currentPage - 1 : 1
                    // })
                    if (this.state.startPoint > 0) {
                        this.setState({
                            startPoint: parseInt(this.state.startPoint - this.state.perPage),
                            preservePoint: parseInt(this.state.startPoint - this.state.perPage)
                        })
                    }
                }}
                hasNext
                nextKeys={[0]}

                onNext={() => {
                    // this.setState({
                    //     currentPage: this.state.currentPage - 1 > 0 ? parseInt(this.state.currentPage+1) : 1
                    // })
                    // this.getProducts(this.state.nextPage);
                    this.setState({
                        startPoint: parseInt(this.state.startPoint + this.state.perPage),
                        preservePoint: parseInt(this.state.startPoint + this.state.perPage)
                    })

                }}
            />
        </div>
        // }
        if (this.state.loading == true) {
            return (
                <div className="col-md-6 offset-2">
                    <Layout.Section>
                        <Card title="Please wait a bit. Products are loading">
                            <div className="offset-5">
                            <Spinner  accessibilityLabel="Spinner example" size="large" color="teal" />
                            </div>
                           
                        </Card>
                    </Layout.Section>
                </div>
            );

        }
        else{
            return (
            
                <Card title="All Products" sectioned>
                    <div style={{ width: "96%", position: "relative", left: "2%" }}>
                        {this.state.toastMarkup}
                        <Form>
                            <FormLayout>
                                <TextField placeholder="Search by product title" value={this.state.key} onChange={(value) => {
                                    let result = this.state.permanentProductList.filter(product => product.title.toUpperCase().indexOf(value.toUpperCase()) > -1);
    
                                    this.setState({ key: value, productList: result, startPoint: 0 })
                                    if (value == '') {
                                        this.setState({
                                            startPoint: this.state.preservePoint
                                        })
                                    }
                                }} />
                            </FormLayout>
                        </Form>
                    </div>
                
                    {products}
    
                    {pagination}
                </Card>
            )
        }

        
    }
}

export default Product
