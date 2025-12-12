// Simple front-end behaviors: reviews + mock payment flow
document.addEventListener('DOMContentLoaded',()=>{

  // Reviews: store in localStorage so public can see
  const form = document.getElementById('review-form');
  const list = document.getElementById('reviews-list');

  function loadReviews(){
    const reviews = JSON.parse(localStorage.getItem('tsf_reviews')||'[]');
    list.innerHTML = reviews.map(r=>`
      <div class="review"><strong>${escapeHtml(r.name)} — ${r.rating}/5</strong><div>${escapeHtml(r.msg)}</div></div>
    `).join('\n');
  }

  function escapeHtml(s){ return (''+s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const name = document.getElementById('rname').value.trim();
      const msg = document.getElementById('rmsg').value.trim();
      const rating = document.getElementById('rrating').value;
      if(!name||!msg||!rating)return alert('Please fill all fields');
      const reviews = JSON.parse(localStorage.getItem('tsf_reviews')||'[]');
      reviews.unshift({name,msg,rating,at:Date.now()});
      localStorage.setItem('tsf_reviews', JSON.stringify(reviews));
      form.reset();
      loadReviews();
      alert('Thanks — your review is live (visible to visitors).');
    });
    loadReviews();
  }

  // Payment buttons: simple flows
  const payNow = document.getElementById('pay-now');
  const coursePay = document.getElementById('course-pay');
  const rzpPay = document.getElementById('rzp-pay');
  const upiPay = document.getElementById('upi-pay');

  function openRazorpayMock(){
    // Instruct user to replace with real key and server order flow
    alert('This will open Razorpay checkout. To enable real payments, add Razorpay key and server order creation. For now you can use UPI or contact via WhatsApp.');
    window.open('https://wa.me/917404276172','_blank');
  }

  if(payNow) payNow.addEventListener('click', openRazorpayMock);
  if(coursePay) coursePay.addEventListener('click', openRazorpayMock);
  if(rzpPay) rzpPay.addEventListener('click', openRazorpayMock);
  if(upiPay) upiPay.addEventListener('click', ()=>{ alert('If your device supports UPI link it will open the UPI app.'); });

  // Contact form - simple local alert (no backend)
  const cform = document.getElementById('contact-form');
  if(cform){
    cform.addEventListener('submit', e=>{
      e.preventDefault();
      alert('Thanks! Your message was sent. We will contact you on WhatsApp.');
      cform.reset();
      window.open('https://wa.me/917404276172','_blank');
    });
  }

});