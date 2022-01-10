import React from 'react';
import './related.css';
import { IoMdCheckmark } from "react-icons/io";
import Feature from './Feature.jsx'

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      compFeatures: [],
      mainFeatures: [],
      compID: null,
      mainID: null
    }
  }

  componentDidUpdate() {
    if (this.props.compProduct.id !== this.state.compID) {
      this.setState({ compID: this.props.compProduct.id });
      this.getFeatures();
    }
    if (this.props.mainProduct.id !== this.state.mainID) {
      this.setState({ mainID: this.props.mainProduct.id });
      this.getFeatures();
    }
  }

  getFeatures = () => {
    const { features } = this.props.mainProduct;
    const compFeatures = this.props.compProduct.features;
    let list = [];
    let compList = [];
    let mainList = [];
    if (features) {
      features.forEach(feature => {
        if (feature.value) {
          list.push(`${feature.value} ${feature.feature}`);
          mainList.push(`${feature.value} ${feature.feature}`);
        } else {
          list.push(feature.feature);
          mainList.push(feature.feature);
        }
      });
    }

    if (compFeatures) {
      compFeatures.forEach(feature => {
        let name;
        if (feature.value) {
          name = `${feature.value} ${feature.feature}`;
        } else {
          name = feature.feature;
        }
        compList.push(name);
        if (!list.includes(name)) {
          list.push(name);
        }
      });
    }

    this.setState({ features: list });
    this.setState({ compFeatures: compList });
    this.setState({ mainFeatures: mainList });
  }

  render() {
    return (
      <div>
        <p className='modal-title'>COMPARING</p>
        <table>
          <thead>
            <tr>
              <th>{this.props.mainProduct.name}</th>
              <th className='right-modal'>{this.props.compProduct.name}</th>
            </tr>
          </thead>
          <tbody>
            {this.state.features.map((feature, i) => (
              <Feature key={i} feature={feature} mainFeatures={this.state.mainFeatures} compFeatures={this.state.compFeatures} />
            ))}
          </tbody>
        </table>
      </div >
    )
  }
};

export default Compare;