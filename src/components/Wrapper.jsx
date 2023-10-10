import MenuBar from "./MenuBar"
import PropTypes from "prop-types";

const Wrapper = ({children}) => {

    return (
        <div className="flex">
            <MenuBar />
            {children}
        </div>
    )
}

Wrapper.propTypes = {
    children: PropTypes.node,
  };


export default Wrapper