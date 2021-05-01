import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';

import Book, { Props } from '../components/book'
// NOT FINISHED

describe('<Book />', () => {
  test('should display a book', async () => {

  })
})

// const renderBook:any = (props: Partial<Props> = {}) => {
//   const defaultProps: Props = {
//     setSelectedBook() {
//       return;
//     },
//     setVoted() {
//       return;
//     },
//     voted: 0,
//     selectedBook: {
//       title: '',
//       src: '',
//       OLID: '',
//     }
//   }
//   return render(<Book {...defaultProps} {...props}/>)
// }