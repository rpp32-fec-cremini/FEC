import React from 'react';
import './related.css';
import { IoMdCheckmark } from "react-icons/io";

class Compare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      features: []
    }
  }

  componentDidMount() {
    // this.getFeatures();
  }

  getFeatures = () => {
    const { features } = this.props.mainProduct;
    if (features) {
      features.forEach(feature => console.log(feature));
    }
    // this.props.compProduct.features.forEach(feature => console.log(mainProduct.name, feature[1]));
  }

  render() {
    const { features } = this.props.mainProduct;
    const compFeatures = this.props.compProduct.features;
    let list = [];
    if (features) {
      features.forEach(feature => {
        if (feature.value) {
          list.push(`${feature.value} ${feature.feature}`);
          console.log(`${feature.value} ${feature.feature}`);
        } else {
          list.push(feature.feature);
          console.log(feature.feature);
        }
      });

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

    console.log(list);
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
            <tr>
              <td> <IoMdCheckmark /> </td>
              <td className='modal-text'> </td>
              <td className='right-modal'> <IoMdCheckmark /> </td>
            </tr>
          </tbody>
        </table>
      </div >
    )
  }
};

export default Compare;