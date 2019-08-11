import React, { Component } from 'react'
import { Button } from 'reactstrap'
import style from './style.scss'
import { Document, Page } from "react-pdf";

export default class PDFPopup extends Component {
      static defaultProps = {
          onDone: () => {},
          pdfData:''
      }
    state = { numPages: null, pageNumber: 1, width: window.innerWidth, };
   //listen for changes in window size to reset size of pdf to display
    componentWillMount() {
      window.addEventListener('resize', this.handleWindowSizeChange);
    }

    // make sure to remove the listener
    // when the component is not mounted anymore
    componentWillUnmount() {
      window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
      this.setState({ width: window.innerWidth });
    };
    onDocumentLoadSuccess = ({ numPages }) => {
      this.setState({ numPages });
    };

    goToPrevPage = () => {
      const { pageNumber, numPages } = this.state;
      if (pageNumber > 1){
          this.setState(state => ({ pageNumber: state.pageNumber - 1 }));}
        }
    goToNextPage = () => {
      const { pageNumber, numPages } = this.state;
      if (pageNumber < numPages){
          this.setState(state => ({ pageNumber: state.pageNumber + 1 }));}
        }
      render() {
        const { pageNumber, numPages, width } = this.state;
        const isMobile = width <= 500;

          //console.log(page)
          return (
              <div className={style.wrapper}>
                <nav>
                          <button onClick={this.goToPrevPage}>Prev</button>
                          <button onClick={this.goToNextPage}>Next</button>
                </nav>
                { this.props.pdfData ? (
                    // <object
                    //      data={ 'data:application/pdf;charset=utf-8;base64,' + this.props.pdfData }
                    //      type='application/pdf'
                    //      width="100%"
                    //      height="100%"
                    //      >
                    // </object>):null}
                    <div>
                      {isMobile ?
                      <Document
                          onLoadSuccess={this.onDocumentLoadSuccess}
                          file={'data:application/pdf;charset=utf-8;base64,' + this.props.pdfData}>
                          <Page pageNumber={pageNumber} width={300} />
                      </Document>:
                      <Document
                          onLoadSuccess={this.onDocumentLoadSuccess}
                          file={'data:application/pdf;charset=utf-8;base64,' + this.props.pdfData}>
                          <Page pageNumber={pageNumber} width={900} />
                      </Document>}


                    </div>
                    ):null}
                    <p>
                       Page {pageNumber} of {numPages}
                    </p>
                    <p>
                        <Button
                            className={style.button}
                            onClick={this.props.onDone}
                        >
                            Done
                        </Button>
                    </p>
              </div>
          )
      }
  }
