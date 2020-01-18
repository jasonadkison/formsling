import React from 'react';

const Subscription = () => (
  <div id="subscription">
    <h1 className="title">Subscription</h1>
    <p className="subtitle">Welcome to your subscription.</p>
    <div className="pricing-table">
      <div className="pricing-plan">
        <div className="plan-header">Free</div>
        <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">$</span>0</span>/month</div>
        <div className="plan-items">
          <div className="plan-item">10 Forms</div>
          <div className="plan-item">100 Monthly Results</div>
          <div className="plan-item">-</div>
          <div className="plan-item">-</div>
        </div>
        <div className="plan-footer">
          <button className="button is-fullwidth" disabled="disabled">Current plan</button>
        </div>
      </div>

      <div className="pricing-plan is-success is-active">
        <div className="plan-header">Starter</div>
        <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">$</span>10</span>/month</div>
        <div className="plan-items">
          <div className="plan-item">Unlimited Forms</div>
          <div className="plan-item">1000 Monthly Results </div>
          <div className="plan-item">Some Perk</div>
          <div className="plan-item">-</div>
        </div>
        <div className="plan-footer">
          <button className="button is-fullwidth">Choose</button>
        </div>
      </div>

      <div className="pricing-plan is-dark">
        <div className="plan-header">Professional</div>
        <div className="plan-price"><span className="plan-price-amount"><span className="plan-price-currency">$</span>40</span>/month</div>
        <div className="plan-items">
          <div className="plan-item">Unlimited Forms</div>
          <div className="plan-item">Unlimited Results</div>
          <div className="plan-item">Some Perk</div>
          <div className="plan-item">Some Perk</div>
        </div>
        <div className="plan-footer">
          <button className="button is-fullwidth">Choose</button>
        </div>
      </div>
    </div>
  </div>
);

export default Subscription;
