import React from "react";

import logo from "../assets/4reddit_logo_trans.png";
import logoGIF from "../assets/obamasphere.gif";

export default class Logo extends React.Component {
    state = {
        hovering: false
    };

    render() {
        return (
            <React.Fragment>
                <a href={this.props.href}>
                    <img
                        src={this.state.hovering ? logoGIF : logo}
                        onMouseOver={() => this.setState({hovering: true})}
                        onMouseOut={() => this.setState({hovering: false})}
                        style={this.props.sx}
                    />
                </a>
            </React.Fragment>
        );
    }
}
