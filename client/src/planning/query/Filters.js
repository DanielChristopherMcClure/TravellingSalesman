import React, {Component} from 'react';
import Modal from 'react-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
var FontAwesome = require('react-fontawesome');

const filterModalStyle = {
  content : {
    top : '50%',
    left : '50%',
    right : 'auto',
    bottom : 'auto',
    marginRight : '-50%',
    transform : 'translate(-50%, -50%)',
    width: '500px',
    maxWidth: '100vw',
    overflow: "none"
  }
};

class Filters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersOpen: false,
      attributeFilters: {},
      selectedFilters: {}
    }
    this.openFilters = this.openFilters.bind(this);
    this.closeFilters = this.closeFilters.bind(this);
    this.renderAddFilter = this.renderAddFilter.bind(this);
    this.updateAttributeFilters = this.updateAttributeFilters.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(this.state.attributeFilters).length !== nextProps.config.filters.length) {
      this.updateAttributeFilters(nextProps.config.filters);
    }
  }

  updateAttributeFilters(filters) {
    this.props.updateFilters([]);
    this.state.attributeFilters = {};
    this.state.selectedFilters = {};
    for(let i = 0; i < filters.length; i++){
      let attribute = filters[i].attribute;
      let options = [];
      for(let j = 0; j < filters[i].values.length; j++) {
        let opt = filters[i].values[j]
        options.push({label: opt, value: opt});
      }
      this.state.attributeFilters[attribute] = options;
      this.state.selectedFilters[attribute] = [];
    }
    this.setState(this.state);
  }

  openFilters() {
    if (Object.keys(this.state.attributeFilters).length === 0) {
      this.updateAttributeFilters(this.props.config.filters);
    }
    this.setState({filtersOpen: true});
  }

  closeFilters() {
    let filtersToApply = []
    for(let attr in this.state.selectedFilters) {
      if(this.state.selectedFilters[attr].length > 0) {
        filtersToApply.push({attribute: attr, values: this.state.selectedFilters[attr].split(',')});
      }
    }
    this.props.updateFilters(filtersToApply);
    this.setState({filtersOpen: false});
  }

  handleSelectChange(attribute, value) {
    this.state.selectedFilters[attribute] = value;
    this.setState(this.state.selectedFilters);
  }

  renderAddFilter() {
    let toRender = [];
    if(this.props.config.version >= 3) {
      toRender.push(<div key="limit" className="col-12 px-0">
        <div className="col-12">Limit # Results:</div>
        <div className="col-12">
        <input type="number" min="1" max="5000" className="Select-control"
          onChange={this.props.updateLimit} value={this.props.limit}/></div>
      </div>);
    }
    for(let attribute in this.state.attributeFilters) {
      toRender.push(<div key={attribute} className="col-12 px-0">
        <div className="col-12">{attribute}:</div>
        <Select
          className="col-12"
          multi
        	onChange={(value) => this.handleSelectChange(attribute, value)}
          options={this.state.attributeFilters[attribute]}
          placeholder="Choose Filters"
          simpleValue
          value={this.state.selectedFilters[attribute]}
        />
      </div>);
    }
    return(<div className="col-12 px-0">{toRender}</div>);
  }

  render() {
    return (
      <div>
        <button className="btn btn-csu btn-csu-icons" onClick={this.openFilters}
          title="Apply filters to search.">
          <FontAwesome name='filter'/></button>
        <Modal
          style={filterModalStyle}
          isOpen={this.state.filtersOpen}
          ariaHideApp={false}
        >
          <div className="row">
            <button className="btn btn-csu btn-csu-icons col-12" onClick={this.closeFilters}>
              <FontAwesome name='check-square'/> Done</button>
            {(this.props.config.version >= 3)?
              this.renderAddFilter()
              :<div class="alert alert-warning" role="alert">
                Sorry, No Support for Filters Destinations on this Server</div>}
          </div>
        </Modal>
      </div>
    )
  }
}

export default Filters;
