import React from 'react';

import {connect} from 'react-redux';

import Logout from './logout';
import NavBar from './nav-bar';
import Circle from './circle';
import SubTable from './sub-table';

import '../css/dashboard.css';
import { fetchAllSubscriptions } from '../../actions';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchAllSubscriptions())
    }

    render() {
        console.log(monthlyCost);

        let monthly = [];
        let yearly = [];
        if (this.props.subscriptions) {
            monthly = this.props.subscriptions.filter(sub => sub.frequency === 'monthly')
            yearly = this.props.subscriptions.filter(sub => sub.frequency === 'yearly')
        }
        console.log(monthly, yearly)

        let monthlyCost = 0;
        let yearlyCost = 0;
        let annualCost = 0;

        if (monthly) {
            for (let i = 0; i < monthly.length; i++) {
                monthlyCost += monthly[i].price;
            }
        }

        if (yearly) {
            for (let i = 0; i < yearly.length; i++) {
                yearlyCost += yearly[i].price;
            }
        }

        monthlyCost = monthlyCost;
        annualCost = (yearlyCost + (monthlyCost*12));

        return (
            <div className="dashboard-container">
                <Logout />
                <NavBar />
                <div className="circles">
                    <Circle
                        numberValue={monthly.length}
                        textValue={monthly.length === 1 ? "Monthly Subscription" : "Monthly Subscriptions"}/>
                    <Circle 
                        numberValue={monthlyCost}
                        textValue="Monthly total"/>
                    <Circle 
                        numberValue={yearly.length}
                        textValue={monthly.length === 1 ? "Yearly Subscription" : "Yearly Subscriptions"}/>
                    <Circle 
                        numberValue={annualCost}
                        textValue="Yearly Total"/>
                </div>
                <SubTable subscriptions={this.props.subscriptions}/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    subscriptions: state.subscriptions,
    loading: state.loading
})

export default connect(mapStateToProps)(Dashboard)