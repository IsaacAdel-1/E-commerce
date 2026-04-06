import './Discover.css'
const Discover = () => {

    return (
        <>
            <div className="discoverContainer">
                <div className="discoverContent">
                    <div className="discoverText">
                        <h2>Discover Summer Collection</h2>
                        <p className='Explore'>Explore our latest arrivals with up to 30% off on selected items</p>
                    </div>

                    <div className="discoverButtons">
                        <button className="shopNowButton">Shop Now </button>

                        <button>Learn More</button>
                    </div>
                </div>

                <div className="discoverImage">
                    <img src="./undraw_car-salesman_ni2a.svg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Discover;