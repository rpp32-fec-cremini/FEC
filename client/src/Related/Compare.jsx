import React from 'react';
import './related.css';
import { IoMdCheckmark } from "react-icons/io";
import Feature from './Feature.jsx';
import getClicks from '../getClicks.jsx';

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: [],
      compFeatures: [],
      mainFeatures: []
    }
  }

  componentDidUpdate(nextProps) {
    if (nextProps.compProduct.id !== this.props.compProduct.id) {
      this.getFeatures();
    }
    if (nextProps.mainProduct.id !== this.props.mainProduct.id) {
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

    this.setState({ features: list, compFeatures: compList, mainFeatures: mainList });
  }

  render() {
    return (
      <div className='table'>
        <div className='thead'>
          <p className='modal-head'>COMPARING</p>
          <div className='modal-titles'>
            <p className='left-title'>{this.props.mainProduct.name}</p>
            <p className='right-title'>{this.props.compProduct.name}</p>
          </div>
        </div>
        <ul className='modal-list'>
          {this.state.features.map((feature, i) => (
            <Feature key={i} feature={feature} mainFeatures={this.state.mainFeatures} compFeatures={this.state.compFeatures} />
          ))}
        </ul>
      </div>
    )
  }
};

export default getClicks(Compare);