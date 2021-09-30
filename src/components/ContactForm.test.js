import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm/>)
});

test('renders the contact form header', ()=> {
    //arrange: render app
    const { debug } = render(<ContactForm/>);
    console.log(debug);

    //act: find our header
    const header = screen.getByText(/Contact Form/i);
    //assert: pass the test if our header element exist
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent(/contact form/i);
    expect(header).toBeTruthy();
    expect(header).toBeVisible();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //arrange: render 
    render(<ContactForm/>);

    //act: 
    const firstNameInput = screen.getByLabelText(/first Name/i);
    userEvent.type(firstNameInput, 'abcd');
    const errorFeedback = await screen.findByText(
        /Error: firstName must have at least 5 characters./i
    );

    //assert:
    expect(errorFeedback).toBeInTheDocument();
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    //arrange: render 
    render(<ContactForm/>);

    
    const button = screen.getByRole("button");

    userEvent.click(button);

    const errorFeedback = await screen.findByText(
        /Error: firstName must have at least 5 characters./i
    );
    const errorFeedbackLast = await screen.findByText(
        /Error: lastName is a required field./i
    );
    const errorFeedbackEmail = await screen.findByText(
        /Error: email must be a valid email address./i
    );

    //assert:
    expect(errorFeedback).toBeInTheDocument();
    expect(errorFeedbackLast).toBeInTheDocument();
    expect(errorFeedbackEmail).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    //arrange: render 
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first Name/i);
    const lastNameInput = screen.getByLabelText(/last Name/i);
    const button = screen.getByRole("button");

    userEvent.type(firstNameInput, 'Manny');
    userEvent.type(lastNameInput, 'Gatica');
    userEvent.click(button);

    const errorFeedbackEmail = await screen.findByText(
        /Error: email must be a valid email address./i
    );

    //assert:
    expect(errorFeedbackEmail).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm/>)

    const email = screen.getByLabelText(/Email/i);

    userEvent.type(email, '3');

    const errorFeedbackEmail = await screen.findByText(
        /Error: email must be a valid email address./i
    );

    //assert:
    expect(errorFeedbackEmail).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm/>);

    const button = screen.getByRole("button");

    userEvent.click(button);

    const errorFeedbackLast = await screen.findByText(
        /Error: lastName is a required field./i
    );
    
    expect(errorFeedbackLast).toBeInTheDocument();

    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first Name/i);
    const lastNameInput = screen.getByLabelText(/last Name/i);
    const email = screen.getByLabelText(/email/i);
    const button = screen.getByRole("button");

    userEvent.type(firstNameInput, 'Manny');
    userEvent.type(lastNameInput, 'Gatica');
    userEvent.type(email, 'egatica51@gmail.com');
    userEvent.click(button);

    const firstNameData = screen.getByTestId('firstnameDisplay');
    const lastNameData = screen.getByTestId('lastnameDisplay');
    const emailData = screen.getByTestId('emailDisplay');

    expect(firstNameData).toBeInTheDocument();
    expect(lastNameData).toBeInTheDocument();
    expect(emailData).toBeInTheDocument();


});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm/>);

    const firstNameInput = screen.getByLabelText(/first Name/i);
    const lastNameInput = screen.getByLabelText(/last Name/i);
    const email = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const button = screen.getByRole("button");

    userEvent.type(firstNameInput, 'Manny');
    userEvent.type(lastNameInput, 'Gatica');
    userEvent.type(email, 'egatica51@gmail.com');
    userEvent.type(messageInput, 'This is my message to you! Hello world!');
    userEvent.click(button);

    const firstNameData = screen.getByTestId('firstnameDisplay');
    const lastNameData = screen.getByTestId('lastnameDisplay');
    const emailData = screen.getByTestId('emailDisplay');
    const messageData = screen.getByTestId('emailDisplay');

    expect(firstNameData).toBeInTheDocument();
    expect(lastNameData).toBeInTheDocument();
    expect(emailData).toBeInTheDocument();
    expect(messageData).toBeInTheDocument();
});