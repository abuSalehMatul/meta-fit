import React, { Component } from 'react'
import { List, Card, Modal } from "@shopify/polaris"

export class MetaField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metafields: '',
            showModal: false
        };
    }

    componentWillReceiveProps(updatedProps) {
        this.setState({ metafields: updatedProps.meta });
    }
    render() {
        let metas = [];
        for (let i = 0; i < this.state.metafields.length; i++) {
            metas.push(
                <List type="bullet" key={i}>
                    <List.Item>{this.state.metafields[i].name}</List.Item>

                </List>
            )
        }
        return (
            <div>
                <Card sectioned title="Manage Fit Information" actions={[{ content: 'Show all Options', onAction: () => { this.setState({ showModal: true }) } }]}>
                    <p>
                        Please select an option from dropdown to set the fit information for that product
                </p>
                </Card>
                <Modal
                    activator={this.state.showModal}
                    open={this.state.showModal}
                    onClose={() => { this.setState({ showModal: false }) }}
                    title="Custom meta tags"
                    primaryAction={{
                        content: 'Close',
                        onAction: () => { this.setState({ showModal: false }) },
                    }}

                >
                    <Modal.Section>
                        {metas}
                    </Modal.Section>
                </Modal>
            </div>
        )
    }
}

export default MetaField
