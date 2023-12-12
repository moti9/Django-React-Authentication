import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 mb-4">
                        <h4>Contact Us</h4>
                        <p>Email: info@example.com</p>
                        <p>Phone: +1 123 456 7890</p>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h4>Follow Us</h4>
                        <ul className="list-unstyled">
                            <li>
                                <a href="#!">Facebook</a>
                            </li>
                            <li>
                                <a href="#!">Twitter</a>
                            </li>
                            <li>
                                <a href="#!">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 mb-4">
                        <h4>About Us</h4>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                            ac tristique justo.
                        </p>
                    </div>
                </div>
                <hr className="my-4 bg-light" />
                <p className="text-center mb-0">&copy; 2023 Your Website Name</p>
            </div>
        </footer>
    );
};

export default Footer;
