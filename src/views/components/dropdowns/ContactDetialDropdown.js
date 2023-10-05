import React, {Component} from 'react';
class ContactDetialDropdown extends Component {

    render() {
        return (
            <>
                <div className="px-3">
                    <h4 className="mt-3 mb-2">Placeholders</h4>
                    <ul className="d-flex flex-wrap">
                        {this.props.placeholders.map(placeholder=>{
                            return <li key={placeholder.label} onClick={()=>this.props.onSelectPlaceholder(placeholder)}>{placeholder.label}</li>
                        })}
                    </ul>
                    {/* <h4 className="mt-3 mb-2">My Details</h4>
                    <ul className="d-flex flex-wrap">
                        <li>[My First Name]</li>
                        <li>[My Last Name]</li>
                    </ul> */}
                </div>
            </>
        );
    }
}

export default ContactDetialDropdown;
