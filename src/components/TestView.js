import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth'


const TestView = (props) => (
    <div>

       
    </div>
);


const getTest = (test, state) => {

};

const mapStateToProps = (state) => {
    state.tests.forEach((test) => {
        const template = state.templates.find((template) => template.id === test.template );
        const title = template.title;
        const steps = state.steps.filter((step) => template.steps.some((id) => id === step.id ));
        const contexts = state.contexts.filter((context) => template.contexts.some((id) => id === context.id ));
        let contextValues = {};
        contexts.forEach((context, index) => {
            contextValues[context.name] = context[test.contextSelectors[index]]
        } );

        const variables = {...test.variables, ...contextValues};

        console.log(variables);
    });
    
    return {
        
    };
};



export default connect(mapStateToProps)(TestView);