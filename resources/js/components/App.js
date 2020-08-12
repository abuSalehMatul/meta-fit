import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Layout, AppProvider, Card, DisplayText, Page, Frame } from "@shopify/polaris";
import "@shopify/polaris/styles.css";
import Body from "./Body";


function Root() {
    return (
        <div style={{maxWidth:"100%", overflowX:"hidden"}}>
        <AppProvider i18n={{
            Polaris: {
                Common: {
                    checkbox: 'case à cocher',
                },
                ResourceList: {
                    sortingLabel: 'Trier par',
                    showing: '{itemsCount} {resource} affichés',
                    defaultItemPlural: 'articles',
                    defaultItemSingular: 'article',
                    Item: {
                        viewItem: "Afficher les détails de l'{itemName}",
                    },
                },
            },
        }} features={{ newDesignLanguage: true }}>
            
            <Frame>
                
                <Page>
                    <Layout>
                        <Layout.Section>
                            <Card title="Welcome" sectioned>

                                <DisplayText size="small">Hi ! Des-kohan please have a look on your app</DisplayText>
                            </Card>

                        </Layout.Section>


                    </Layout>
                    <Body shop={shop}></Body>
                </Page>
                
                
            </Frame>
          
        </AppProvider>
        </div>
        
    );
}

export default Root;

if (document.getElementById('app')) {
    var shop = $("#app").data('id');
    localStorage.setItem('shop_origin', shop);
    ReactDOM.render(<Root />, document.getElementById('app'));
}
