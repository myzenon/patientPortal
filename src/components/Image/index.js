import React, { Component } from 'react'
import style from './style.scss'

import Magnifier from 'assets/enlarge_icon.svg'

import ImagePopup from 'components/ImagePopup'
  
export default class Image extends Component {
    state = {
        zoom: false
    }
    handleZoomIn = () => {
        this.setState({ zoom: true })
    }
    handleZoomOut = () => {
        this.setState({ zoom: false })
    }
    render() {
        if (this.state.zoom) {
            return this.renderZoom()
        }
        return (
            <div >  

             { this.props.src ? ( 
                         <div className={style.imageWrapper}>
                         <img
                            alt=""
                            {...this.props}
                            onClick={this.handleZoomIn}
                        /> 
                        <Magnifier  className={style.imageMagnifyZoomIn}  onClick={this.handleZoomIn}/> 

                       <label className={style.zoomInText}> Make Photo Larger </label>
                        </div>
                    ) : 
                    <div className={style.noImageWrapper}>
                          <label className={style.NoImageText}> Image Not Available</label>
                     </div>
                    
                    }  
            </div>
        )
    }
    renderZoom() {
        const props = {...this.props} 
        return (
            <span>            { this.props.src ? ( 
                <div className={style.imageWrapper}>
                <img
                   alt=""
                   {...this.props}
                   onClick={this.handleZoomIn}
               />  
               </div>
           ) : 
           <div className={style.noImageWrapper}>
                 <label className={style.NoImageText}> Image Not Available</label>
            </div>
           
           }  

            <div className={style.imageZoomWrapper} > 
              {  <ImagePopup  {...props}  onClose={this.handleZoomOut}  /> }
            </div>
            </span>

        )
    }
}