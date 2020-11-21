import { Component } from 'react';
import { getPublicPins } from '../../helpers/data/pinData';
import PublicPinCard from '../cards/publicPinCard';

export default class PublicPins extends Component {
  state = {
    pubPins: [],
  };

  componentDidMount() {
    this.getPubPins();
  }

  getPubPins = () => {
    getPublicPins().then((resp) => {
      this.setState({ pubPins: resp });
    });
  }

  render() {
    const { pubPins } = this.state;
    const showPins = () => pubPins.map((pin) => <PublicPinCard key={pin.firebaseKey} pinData={pin} />);
    return (
          <>
            <h2>New on Pinterest</h2>
            <div className="d-flex flex-wrap container">{showPins()}</div>
          </>
    );
  }
}
