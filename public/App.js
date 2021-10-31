"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var initialCustomers = [];
/* extends React.Component {
    constructor () {
        super();
        this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick(e) {
        e.preventDefault();
        this.hideComponent("AddCustomer")
    }

    render() {
      return (
            <button onClick={this.handleClick}>
                Add Customer fake
            </button>
      );
    }
  }*/

var DisplayFreeSlots = /*#__PURE__*/function (_React$Component) {
  _inherits(DisplayFreeSlots, _React$Component);

  var _super = _createSuper(DisplayFreeSlots);

  function DisplayFreeSlots() {
    _classCallCheck(this, DisplayFreeSlots);

    return _super.call(this);
  }

  _createClass(DisplayFreeSlots, [{
    key: "render",
    value: function render() {
      var slots_left = 25 - this.props.customers.length;
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        name: "limit_alert"
      }), /*#__PURE__*/React.createElement("p", {
        className: "slots_left_header"
      }, "Slots left: ", slots_left));
    }
  }]);

  return DisplayFreeSlots;
}(React.Component);

var CustomerRow = /*#__PURE__*/function (_React$Component2) {
  _inherits(CustomerRow, _React$Component2);

  var _super2 = _createSuper(CustomerRow);

  function CustomerRow() {
    _classCallCheck(this, CustomerRow);

    return _super2.apply(this, arguments);
  }

  _createClass(CustomerRow, [{
    key: "render",
    value: function render() {
      var customer = this.props.customer;
      return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, customer.id), /*#__PURE__*/React.createElement("td", null, customer.name), /*#__PURE__*/React.createElement("td", null, customer.phone_number), /*#__PURE__*/React.createElement("td", null, customer.timestamp.toTimeString()));
    }
  }]);

  return CustomerRow;
}(React.Component);

var CustomerTable = /*#__PURE__*/function (_React$Component3) {
  _inherits(CustomerTable, _React$Component3);

  var _super3 = _createSuper(CustomerTable);

  function CustomerTable() {
    _classCallCheck(this, CustomerTable);

    return _super3.apply(this, arguments);
  }

  _createClass(CustomerTable, [{
    key: "render",
    value: function render() {
      var customerRows = this.props.customers.map(function (customer) {
        return /*#__PURE__*/React.createElement(CustomerRow, {
          key: customer.id,
          customer: customer
        });
      });
      return /*#__PURE__*/React.createElement("table", {
        className: "bordered-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Serial No."), /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Phone number"), /*#__PURE__*/React.createElement("th", null, "Timestamp"))), /*#__PURE__*/React.createElement("tbody", null, customerRows));
    }
  }]);

  return CustomerTable;
}(React.Component);

var AddCustomer = /*#__PURE__*/function (_React$Component4) {
  _inherits(AddCustomer, _React$Component4);

  var _super4 = _createSuper(AddCustomer);

  function AddCustomer() {
    var _this;

    _classCallCheck(this, AddCustomer);

    _this = _super4.call(this);
    _this.handleSubmit = _this.handleSubmit.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AddCustomer, [{
    key: "handleSubmit",
    value: function handleSubmit(e) {
      e.preventDefault();
      var form = document.forms.addCustomer;
      var customer = {
        name: form.name.value,
        phone_number: form.phone.value
      };
      this.props.createCustomer(customer);
      form.name.value = "";
      form.phone.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Add customer"), /*#__PURE__*/React.createElement("form", {
        name: "addCustomer",
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/React.createElement("input", {
        type: "text",
        name: "name",
        placeholder: "Name (required)",
        required: true,
        style: {
          margin: 10
        }
      }), /*#__PURE__*/React.createElement("input", {
        type: "tel",
        name: "phone",
        placeholder: "Phone number (8 digits)",
        pattern: "[0-9]{8}",
        style: {
          margin: 10
        }
      }), /*#__PURE__*/React.createElement("button", {
        style: {
          margin: 10
        }
      }, "Add")));
    }
  }]);

  return AddCustomer;
}(React.Component);

var DeleteCustomer = /*#__PURE__*/function (_React$Component5) {
  _inherits(DeleteCustomer, _React$Component5);

  var _super5 = _createSuper(DeleteCustomer);

  function DeleteCustomer() {
    var _this2;

    _classCallCheck(this, DeleteCustomer);

    _this2 = _super5.call(this);
    _this2.handleDelete = _this2.handleDelete.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  _createClass(DeleteCustomer, [{
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      var form = document.forms.deleteCustomer;
      var customer = {
        id: form.id.value
      };
      this.props.deleteCustomer(customer);
      form.id.value = "";
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Delete customer from the queue"), /*#__PURE__*/React.createElement("form", {
        name: "deleteCustomer",
        onSubmit: this.handleDelete,
        style: {
          margin: 10
        }
      }, /*#__PURE__*/React.createElement("input", {
        type: "number",
        name: "id",
        placeholder: "Customer ID to delete",
        style: {
          margin: 10
        }
      }), /*#__PURE__*/React.createElement("button", null, "Delete")));
    }
  }]);

  return DeleteCustomer;
}(React.Component);

var DisplayHomepage = /*#__PURE__*/function (_React$Component6) {
  _inherits(DisplayHomepage, _React$Component6);

  var _super6 = _createSuper(DisplayHomepage);

  function DisplayHomepage() {
    _classCallCheck(this, DisplayHomepage);

    return _super6.apply(this, arguments);
  }

  _createClass(DisplayHomepage, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "Welcome to Hotel California!"));
    }
  }]);

  return DisplayHomepage;
}(React.Component);

var CapacityAlert = /*#__PURE__*/function (_React$Component7) {
  _inherits(CapacityAlert, _React$Component7);

  var _super7 = _createSuper(CapacityAlert);

  function CapacityAlert() {
    _classCallCheck(this, CapacityAlert);

    return _super7.apply(this, arguments);
  }

  _createClass(CapacityAlert, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "No more slots!"));
    }
  }]);

  return CapacityAlert;
}(React.Component);

var DisplayResSystem = /*#__PURE__*/function (_React$Component8) {
  _inherits(DisplayResSystem, _React$Component8);

  var _super8 = _createSuper(DisplayResSystem);

  function DisplayResSystem() {
    var _this3;

    _classCallCheck(this, DisplayResSystem);

    _this3 = _super8.call(this);
    _this3.state = {
      customers: [],
      AddCustomerToggle: false,
      DeleteCustomerToggle: false,
      TooManyCustomers: false
    };
    _this3.hideComponent = _this3.hideComponent.bind(_assertThisInitialized(_this3));
    _this3.createCustomer = _this3.createCustomer.bind(_assertThisInitialized(_this3));
    _this3.deleteCustomer = _this3.deleteCustomer.bind(_assertThisInitialized(_this3));
    return _this3;
  }

  _createClass(DisplayResSystem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "loadData",
    value: function loadData() {
      var _this4 = this;

      setTimeout(function () {
        _this4.setState({
          customers: initialCustomers
        });
      }, 500);
    }
  }, {
    key: "hideComponent",
    value: function hideComponent(varname) {
      switch (varname) {
        case "AddCustomer":
          this.setState({
            AddCustomerToggle: !this.state.AddCustomerToggle
          });
          break;

        case "DeleteCustomer":
          this.setState({
            DeleteCustomerToggle: !this.state.DeleteCustomerToggle
          });
          break;

        default:
          return;
      }
    }
  }, {
    key: "createCustomer",
    value: function createCustomer(customer) {
      customer.id = this.state.customers.length + 1;

      if (customer.id > 25) {
        this.setState({
          TooManyCustomers: true
        });
      } else if (customer.id == 25) {
        customer.timestamp = new Date();
        var newCustomersList = this.state.customers.slice();
        newCustomersList.push(customer);
        this.setState({
          customers: newCustomersList,
          TooManyCustomers: true
        });
      } else {
        customer.timestamp = new Date();

        var _newCustomersList = this.state.customers.slice();

        _newCustomersList.push(customer);

        this.setState({
          customers: _newCustomersList
        });
      }
    }
  }, {
    key: "deleteCustomer",
    value: function deleteCustomer(customer) {
      var ID_to_delete = customer.id - 1;
      var newCustomersList = this.state.customers.slice();
      newCustomersList.splice(ID_to_delete, 1);

      for (var i = 0, len = newCustomersList.length; i < len; i++) {
        newCustomersList[i].id = i + 1;
      }

      ;
      this.setState({
        customers: newCustomersList,
        TooManyCustomers: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var _this$state = this.state,
          AddCustomerToggle = _this$state.AddCustomerToggle,
          DeleteCustomerToggle = _this$state.DeleteCustomerToggle,
          TooManyCustomers = _this$state.TooManyCustomers;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DisplayHomepage, null), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return _this5.hideComponent("AddCustomer");
        }
      }, "Add Customers"), /*#__PURE__*/React.createElement("button", {
        className: "button",
        onClick: function onClick() {
          return _this5.hideComponent("DeleteCustomer");
        }
      }, "Delete Customers")), /*#__PURE__*/React.createElement(DisplayFreeSlots, {
        customers: this.state.customers
      }), AddCustomerToggle && /*#__PURE__*/React.createElement(AddCustomer, {
        createCustomer: this.createCustomer
      }), TooManyCustomers && /*#__PURE__*/React.createElement(CapacityAlert, null), DeleteCustomerToggle && /*#__PURE__*/React.createElement(DeleteCustomer, {
        deleteCustomer: this.deleteCustomer
      }), /*#__PURE__*/React.createElement(CustomerTable, {
        customers: this.state.customers
      }));
    }
  }]);

  return DisplayResSystem;
}(React.Component);

var element = /*#__PURE__*/React.createElement(DisplayResSystem, null);
ReactDOM.render(element, document.getElementById('contents'));