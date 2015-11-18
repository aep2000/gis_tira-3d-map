var DataCatalogItem = React.createClass({

  getInitialState: function() {
    return {
      isPreviewed: false,
      isActive: false
    };
  },

  addToPreview: function(){
    this.setState({
      isPreviewed: true
    });
  },

  addToMap: function(){
    emitter.dispatch('nowViewing', this.props.item);
    this.props.item.isEnabled = !this.props.item.isEnabled;
    this.setState({
      isActive: this.props.item.isEnabled
    });
  },

  componentWillUpdate: function(){
    if(this.state.isActive !== this.props.item.isEnabled){
      this.setState({
      isActive: this.props.item.isEnabled
      });
    }
  },

  componentDidUpdate: function(){
    emitter.dispatch('preview', this.props.item);
  },

  render: function(){
    var item = this.props.item;
    var iconClass = "fa " + (this.state.isActive === true ? "fa-minus-circle red" : "fa-plus-circle blue");
    return (
      <li className="clearfix"><button onClick={this.addToPreview} className="btn data-group__data-item col col-10">{item.name}</button><button onClick={this.addToMap} className="btn col col-2 "><i className={iconClass}> </i></button></li>
      ) ;
  }
});

module.exports = DataCatalogItem;
