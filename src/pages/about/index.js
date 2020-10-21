import React from 'react';
import Bridson from '../../components/bridson'
import './style.scss';

export default function () {

    return (
        <div className="container">
            <div className="about-heading">
                <h1 className="title is-center">The method to our madness</h1>
                <p>What you see is what you get. At Damaged Goods we want to let transparency empower all of us to make better decisions. Whether that’s way we make clothing or the way we do business, we believe if we let customers see behind the curtain ...</p>
            </div>
            <div className="columns">

                {/* Left column */}
                <div className="column">
                    <div className="block">
                        <p>What you see is what you get. At Damaged Goods we want to let transparency empower all of us to make better decisions. Whether that’s way we make clothing or the way we do business, we believe if we let customers see behind the curtain ...</p>
                        <br />
                        <p>When we do something that looks wrong or against our values, don’t speak up, shout! Conflict and debate is healthy if both parties are willing to grow and learn in the process.</p>
                    </div>
                    <div className="block">
                        <div className="blue"> </div>
                    </div>
                    <div className="block pad-top">
                        <h1 className="title">Restoration of the Natural</h1>
                        <hr />
                        <p>We believe that nature is a common space, a blank space, an empty space for thoughts and life to grow. We fight to be able hold onto wonder and defy the world that tries to take, cut, burn, and drain it from our fingers.</p>
                    </div>
                    <div className="block">
                        <div className="blue"></div>
                    </div>
                </div>

                {/* Right column */}
                <div className="column">
                    <div className="block">
                        <Bridson />
                    </div>
                    <div className="block pad-top">
                        <h1 className="title">Embrace our Damage</h1>
                        <hr />
                        <p>We're ALL Damaged in someway, realize who you are; Damage can lead to good if you look for the silver lining. Owning who we are and finding strength within our weaknesses.</p>
                    </div>
                    <div className="block">
                        <div className="blue"></div>
                    </div>
                    <div className="block pad-top">
                        <h1 className="title">Don’t be worn out...Wear Yourself Out</h1>
                        <hr />
                        <p>Don’t spend your energy on people who let you be you. Project your inner self outward to the world, even if its exhausting it will pay dividends to your life</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
