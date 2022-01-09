import React from 'react';
import './related.css';
import { IoMdCheckmark } from "react-icons/io";
import Feature from './Feature.jsx'

class Compare extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: ['rubber', 'nylon', 'drifit']
    }
  }

  componentDidMount() {
    console.log('Mounted');
    this.getFeatures();
  }

  getFeatures = () => {
    const { features } = this.props.mainProduct;
    const compFeatures = this.props.compProduct.features;
    let list = [];
    console.log(this.props.compProduct);
    console.log(this.props.mainProduct);
    if (features) {
      features.forEach(feature => {
        if (feature.value) {
          list.push(`${feature.value} ${feature.feature}`);
        } else {
          list.push(feature.feature);
        }
      });
      console.log(list);
    }

    if (compFeatures) {
      compFeatures.forEach(feature => {
        let name;
        if (feature.value) {
          // list.push(`${feature.value} ${feature.feature}`);
          name = `${feature.value} ${feature.feature}`;
        } else {
          // list.push(feature.feature);
          name = feature.feature;
        }
        if (!list.includes(name)) {
          list.push(name);
        }
      });
    }
    console.log('BEFORE ', list);
    this.setState({ features: list });
    console.log('AFTER ', list);
    console.log('FUNC', this.state.features);
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
            {this.state.features.map(feature => (
              <Feature feature={feature} />
            ))}
          </tbody>
        </table>
      </div >
    )
  }
};

export default Compare;