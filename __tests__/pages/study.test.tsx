import React from 'react';
import ReactDOM from 'react-dom';
import Study from '../../pages/study';
import * as Auth from'../../contexts/AuthContext';
import jestConfig from '../../jest.config';
import { render, screen, cleanup, waitFor, within, fireEvent } from '@testing-library/react';
import mocks from'../mocks';
import { act } from 'react-dom/test-utils'
import userEvent from '@testing-library/user-event'
import { getSavedDecksByEmailService } from '../../services/internalApi'


// jest.mock('../../services/internalApi.tsx', () => ({
//     getSavedDecksByEmailService: async () => ([]),
//     deleteSavesDeckByIdService: async () => (Promise.resolve(true)),
// }))
jest.mock('../../services/internalApi.tsx', () => ({
    getSavedDecksByEmailService: async () => (mocks.testDeckArray),
    deleteSavesDeckByIdService: async () => (Promise.resolve(true)),
}))

let container:any;

describe('testing study page', () => {

    beforeEach(() => {
        act(() => {
            const {container} = render(
                <Auth.AuthContext.Provider value={mocks.contextValues}>
                    <Study />
                </Auth.AuthContext.Provider>
            )
        });
        // container = document.createElement('div')
        // document.body.appendChild(container);
    })

     afterEach(() => {
         //document.body.removeChild(container);
         //container = null;
         cleanup;
       });

    it('should load the study page with auth provider with no flashcards', async () => {
        // act(() => {
        //     ReactDOM.render (
        //         <Auth.AuthContext.Provider value={mocks.contextValues}>
        //             <Study />
        //         </Auth.AuthContext.Provider>, container
        //     )
        // });
        await waitFor(() => {
            const study = screen.getByTestId('study');
            //const study = screen.getByText('My Saved Decks')
            const buttonList = within(study).getAllByRole('button')
            //const flashInPage = within(study).getAllByTestId('flashcard')
            expect(buttonList.length).toBe(4)
            //expect(flashInPage.length).toBe(1);
            //expect(study).toBeTruthy();
        })
    })

    it('should load study page with flashcards', async () => {
        // act(() => {
        //     ReactDOM.render (
        //         <Auth.AuthContext.Provider value={mocks.contextValues}>
        //             <Study />
        //         </Auth.AuthContext.Provider>, container
        //     )
        // });
        await waitFor(() => {
            //testing that clicking a deck will pop up first flashcard
            //const flashButton = screen.getByTestId('setflash1')
            const flashButton = screen.queryByAltText("setflash1");
            //console.log(flashButton[0])
            fireEvent.click(flashButton);
             const study = screen.getAllByTestId('study');
             const flashInPage = within(study[0]).getByText('Are you the first test card?');
             expect(flashInPage).toBeTruthy();
            //testing that clicking next will move to next flashcard
            //const nextButton = within(study[0]).getByDisplayValue("Next");
            //console.log('here')
            // console.log("NEXT", nextButton, "NEXT")
            // fireEvent.click(nextButton);
            // const study2 = screen.getAllByTestId('study');
            // const flashInPage2 = within(study2[0]).getByText('Are you the second test card?');
            // expect(flashInPage2).toBeTruthy();
            // //testing that clicking prev will move to the first flashcard
            // const prevButton = within(study[0]).getByDisplayValue("Prev");
            // fireEvent.click(prevButton);
            // const study3 = screen.getAllByTestId('study');
            // const flashInPage3 = within(study3[0]).getByText('Are you the first test card?');
            // expect(flashInPage3).toBeTruthy();
        })
    })
})