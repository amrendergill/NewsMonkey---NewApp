import React from 'react'
import loading from './loading.gif'
// export class Spinner extends Component {
    const Spinner = () => {
    // render() {
        return (
            <div className="text-center h-2 w-2 ">
                <img className="my-3" src={loading} alt="loading" />
            </div>
        )
    // }
}

export default Spinner
