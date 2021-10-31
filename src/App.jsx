const initialCustomers = [];

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

class DisplayFreeSlots extends React.Component {
    constructor() {
        super();
    }

    render() {
    const slots_left = 25 - this.props.customers.length
      return (
        <div>
            <p name="limit_alert"></p>
            <p className="slots_left_header">Slots left: {slots_left}</p>
            
        </div>
      );
    }
  }
  
  class CustomerRow extends React.Component {
    render() {
      const customer = this.props.customer;
      return (
        <tr>
          <td>{customer.id}</td>
          <td>{customer.name}</td>
          <td>{customer.phone_number}</td>
          <td>{customer.timestamp.toTimeString()}</td>
        </tr>
      );
    }
  }
  
  class CustomerTable extends React.Component {
    render() {
      const customerRows = this.props.customers.map(customer =>
        <CustomerRow key={customer.id} customer={customer} />
    );


      return (
        <table className="bordered-table">
          <thead>
            <tr>
                <th>Serial No.</th>
                <th>Name</th>
                <th>Phone number</th>
                <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
              {customerRows}
          </tbody>
        </table>
      );
    }
  }
  
  class AddCustomer extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(e) {
        e.preventDefault();
        const form = document.forms.addCustomer;
        const customer = {
          name: form.name.value, phone_number: form.phone.value,
        }
        this.props.createCustomer(customer);
        form.name.value = ""; form.phone.value = "";
      }     

    render() {
      return ( 
        <div>
            <h1>Add customer</h1>
            <form name="addCustomer" onSubmit={this.handleSubmit}>
                <input type="text" name="name" placeholder="Name (required)" required={true} style={{margin: 10}}/>
                <input type="tel" name="phone" placeholder="Phone number (8 digits)" pattern="[0-9]{8}" style={{margin: 10}}/>
                <button style={{margin: 10}}>Add</button>
            </form>
        </div>
      );
    }
  }
  
  class DeleteCustomer extends React.Component {

    constructor() {
        super();
        this.handleDelete = this.handleDelete.bind(this);
      }

    handleDelete(e) {
        e.preventDefault();
        const form = document.forms.deleteCustomer;
        const customer = {
          id: form.id.value,
        }
        this.props.deleteCustomer(customer);
        form.id.value = "";
      }     

    render() {
      return ( 
        <div>
            <h1>Delete customer from the queue</h1>
            <form name="deleteCustomer" onSubmit={this.handleDelete} style={{margin: 10}}>
                <input type="number" name="id" placeholder="Customer ID to delete" style={{margin: 10}}/>
                <button>Delete</button>
            </form>
        </div>
      );
    }
  }

  class DisplayHomepage extends React.Component {
    render() {
      return (
        <div>
          <h1>Welcome to Hotel California!</h1>
        </div>
      );
    }
  }

  class CapacityAlert extends React.Component {
    render() {
      return (
        <div>
          <h1>No more slots!</h1>
        </div>
      );
    }
  }
  
  class DisplayResSystem extends React.Component {

    constructor() {
        super();
        this.state = {
          customers: [],
          AddCustomerToggle: false,
          DeleteCustomerToggle: false,
          TooManyCustomers: false
        };
        this.hideComponent = this.hideComponent.bind(this);
        this.createCustomer = this.createCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);
      }
    
      componentDidMount() {
        this.loadData();
      }
    
      loadData() {
        setTimeout(() => {
          this.setState({ customers: initialCustomers });
        }, 500);
      }

    hideComponent(varname) {
        switch (varname) {
          case "AddCustomer":
            this.setState({ AddCustomerToggle: !this.state.AddCustomerToggle });
            break;
          case "DeleteCustomer":
            this.setState({ DeleteCustomerToggle: !this.state.DeleteCustomerToggle });
            break;
          default: return;
        }
    }

    createCustomer(customer) {
        customer.id = this.state.customers.length + 1;
        if (customer.id > 25) {
            this.setState({ TooManyCustomers: true});
        } else if (customer.id == 25) {
            customer.timestamp = new Date();
            const newCustomersList = this.state.customers.slice();
            newCustomersList.push(customer);
            this.setState({ customers: newCustomersList, TooManyCustomers: true });
        } else {
            customer.timestamp = new Date();
            const newCustomersList = this.state.customers.slice();
            newCustomersList.push(customer);
            this.setState({ customers: newCustomersList });
        }
      }
    
    deleteCustomer(customer) {
        const ID_to_delete = customer.id - 1;
        const newCustomersList = this.state.customers.slice();
        newCustomersList.splice(ID_to_delete,1);
        for (let i = 0, len = newCustomersList.length; i < len; i++) {newCustomersList[i].id = i+1};
        this.setState({ customers: newCustomersList, TooManyCustomers: false });
      }  

    render() {
        const { AddCustomerToggle, DeleteCustomerToggle, TooManyCustomers } = this.state;
        return (
        <React.Fragment>
          <DisplayHomepage />
          <div>
            <button className="button" onClick={() => this.hideComponent("AddCustomer")}>
                Add Customers
            </button>
            <button className="button" onClick={() => this.hideComponent("DeleteCustomer")}>
                Delete Customers
            </button>
          </div>
          <DisplayFreeSlots customers={this.state.customers}/>
          {AddCustomerToggle && <AddCustomer createCustomer={this.createCustomer}/>}
          {TooManyCustomers && <CapacityAlert />}
          {DeleteCustomerToggle && <DeleteCustomer deleteCustomer={this.deleteCustomer}/>}
          <CustomerTable customers={this.state.customers}/>
        </React.Fragment>
      );
    }
  }

  const element = <DisplayResSystem />;
  
  ReactDOM.render(element, document.getElementById('contents'));