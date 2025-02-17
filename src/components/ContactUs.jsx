import React from "react";
import "./ContactUs.css"; 

function ContactUs() {
  return (
    <div className="container">
      <div className="image-container">
        <img 
          src="https://s3-alpha-sig.figma.com/img/627c/8e70/59e0e111026664a46bb2b5a22a9c002e?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=c3gmTH2I7yc5LMxoT4uflvWHZMJki-qRE75bcZj7YsSp0IKs~TV1GQKfZTO0V5o3st8S~U3PIZeB6M~KnbiKDPppzp6Pd-1f1hUpg2L7ntGSlBEWi7xy33XAjTobPW28cPxb~qQFvMLQKRjnrCi3YHYbtX8NkQEkSp8oHHOLL7TMHJ9MIaOo682hdxT3UkueyvvOiMg5XRwvG8DWYkK1cjK3VjBGzL2mw-l0Mqucox82E-vf8Xz5KQ4hhA55mCXycuIhOdwb~2W2jGfWc~xQjIWO3rkRJMtQolj9MUqYqutMCiLF93GVhIdGmri02y1boe3ODJ7CErKi6wfV1ETB2w__"
          alt="Contact Us" 
        />
          <div className="mini1-overlay"> Addres: <br />
        1 Brown Street, Sheffield, S1 <br />2BS
        <br /></div>
        
        <div className="mini2-overlay">Phone Number: <br />
                                      +44 (0) 114 2812077
        <br /></div>
  
        <div className="mini3-overlay">Email: <br />
                                       esiminch@gallery.org</div> 
         
      </div>
      <div className="image-container">
        <img 
          src="https://s3-alpha-sig.figma.com/img/ad37/6734/2e1aa70d4073ad04f88085e7ab4da5ed?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=nfEWLixxPnX5bLVF42fb39UkzOOAPxkSrqM2GOjxRdFx9sWs7yrQxvKo2E-6~GPMGpeEZGZGfYuFsyoLcsC8hfQ00HscQcqJ4~VItTzQJKzZLkV8HAA2LsU1ctju5bq4FHUYcmOTF~cygEYwr7T1ADl-G7L1DcqSvXTqMahNjSzXtTqpNlouwhTqbzRHy9yL2mUhOjigF89o3WpPz3WNjrRBPAI8YUetdP5X048qpvbb7fxqsMMf9CKYCbnMhppQx6-gyBNp5p~Wj5mAoMNbxUUmvHK3wsREfpbedhTQAY8tTJJYANLSbGKtgWd5P1v4ILmPJeYXpzh4IRZnUR4BZw__"
          alt="Contact Us" 
        />
        <div className="gInfo-overlay">
          Gallery company
        </div>
        <div className="mini4-overlay"> Register Number: <br />
        1234567
        <br /></div>
        
        <div className="mini5-overlay">Registered Charity:<br />
                                      345786
        <br /></div>
  
        <div className="mini6-overlay">Register Vat: <br />
                                       596421</div> 
      </div>

    </div>
  );
}

export default ContactUs;
