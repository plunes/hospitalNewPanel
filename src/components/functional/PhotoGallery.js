import React, { useState } from "react";
import {
  LightgalleryProvider,
  LightgalleryItem,
  withLightgallery,
  useLightgallery
} from "react-lightgallery";
import "lightgallery.js/dist/css/lightgallery.css";


const GROUP1 = [
  [
    "https://images.unsplash.com/photo-1592549585866-486f41343aaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1592549585866-486f41343aaf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  ],
  [
    "https://images.unsplash.com/photo-1594614271360-0ed9a570ae15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "https://images.unsplash.com/photo-1594614271360-0ed9a570ae15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  ]
];

const GROUP2 = [
        {
            imageUrl:'https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
        },
        {
            imageUrl:'https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'
        }
];

const PhotoItem = ({ image, thumb, group, count, display, id }) => {
  
            return  (
                <div className="image-gallery-div" style={{padding: "0rem", display:!!display?"inherit":'none' }}>
                  <LightgalleryItem group={group} src={image} thumb={thumb}>
                    <img id={count===0?"light-gallery-first-image":''}  className={!!display?id:'random_id'} src={image} style={{ width: "100%", cursor:'pointer', borderRadius:'.5rem' , display:!!display?"inherit":'none'}} />
                  </LightgalleryItem>
                </div>
              )
}

const VideoItem = ({ video, thumb, group, count, display }) => {
   React.useEffect(()=>{
    let element = document.getElementById('#video-gallery')
    if(element){
        console.log("inside it")
        element.lightGallery()
    } 
   },[])

          return  (
              <div className="image-gallery-div" style={{padding: "0rem", display:!!display?"inherit":'none' }}>
                 <div id="video-gallery">
                {/* <LightgalleryItem group={group} src={video} thumb={thumb} type="video" > */}
                <a href={video} target="_blank" data-poster={thumb}>
                    <img src={thumb} />
                 </a>
                </div>
                {/* </LightgalleryItem> */}
              </div>
            )
}

const OpenButtonWithHoc = withLightgallery(({ openGallery, ...props }) => {
  return (
    <button
      {...props}
      onClick={() => {
        openGallery("group1");
      }}
      className={["button is-primary", props.className || ""].join(" ")}
    >
      Open first photos group (using hoc)
    </button>
  );
});

const OpenButtonWithHook = props => {
  const { openGallery } = useLightgallery()
  const { data, limit } = props
  return (
    <React.Fragment>
    <div className="plus_more_wrapper">
                <span style={{cursor:'pointer'}} onClick={() => openGallery("group2")}>{`+${data.length - limit} more`}</span>
                </div>
   </React.Fragment>
  );
};

function PhotoGallery(props) {
  const [visible, setVisible] = useState(true);
  const {data, limit} = props

  const [render_items, set_render_items] = React.useState([])
  const [toggle, set_toggle] = React.useState(false)

  let searchbar = document.getElementById('searchbar')
  let searchIcon = document.getElementsByClassName('header_searchIcon')




React.useEffect(()=>{
  if(props.type==="video"){
    let updated_arr  =   data.map((p, idx) =><VideoItem id={props.id} key={idx} count={idx} thumb={p.thumbnail} video={p.videoUrl} group="group2" display={get_display_prop(idx)} />)
    set_render_items([...updated_arr])

  }else {
    let updated_arr  =   data.map((p, idx) =><PhotoItem id={props.id} key={idx} count={idx} image={p.imageUrl} group="group2" display={get_display_prop(idx)} />)
    set_render_items([...updated_arr])
  }
       


},[data])


const get_display_prop = (key) => {
  
            // if(data.length >limit){
            //         if(key>=limit){
            //             return  false
            //         }else{
            //             return true
            //         }
            // }else {
            //     return true
            // }
            if(key===0){
              return true
            }else {
              return false
            }
}
  const on_before_slide = () => {
    // if(searchIcon){
    //     searchIcon[0].style.display = "none"
    // }
    // if(searchbar){
    //     searchbar.style.display = 'none'
    // }
  }

  const on_close_after = () => {
    // console.info("onCloseAfter")
    // if(searchIcon){
    //     searchIcon[0].style.display = "inline"
    // }
    // if(searchbar){
    //     searchbar.style.display = 'inline'
    // }
  }

  const on_after_slide = () => {
   
  }


  let group_2_item = GROUP2.map((p,idx)=>{
      return <PhotoItem key={idx} count={idx} image={p.imageUrl} group="group2" display="none" />
  })
  const number_click = () => {
      let element  = document.getElementsByClassName(props.id)
      if(element){
        element[0].click()
      }
  }
  return (
    <div className="content">
      <div>
        {visible ? (
          <LightgalleryProvider
            onBeforeOpen={() => console.info("onBeforeOpen")}
            onAfterOpen={() => console.info("onAfterOpen")}
            onSlideItemLoad={() => console.info("onSlideItemLoad")}
            onBeforeSlide={() => on_before_slide()}
            onAfterSlide={() =>   on_after_slide()}
            onBeforePrevSlide={() => console.info("onBeforePrevSlide")}
            onBeforeNextSlide={() => console.info("onBeforeNextSlide")}
            onDragstart={() => console.info("onDragstart")}
            onDragmove={() => console.info("onDragmove")}
            onDragend={() => console.info("onDragend")}
            onSlideClick={() => console.info("onSlideClick")}
            onBeforeClose={() => console.info("onBeforeClose")}
            onCloseAfter={() => on_close_after()}
            plugins = {["lg-fullscreen.js", "lg-thumbnail.js", "lg-video.js", "lg-zoom.js"]}
          >
            <div
            
              style={{
                display: "flex",
                position:"relative",
                alignItems: "center",
                justifyContent: "space-evenly",
                flexWrap:"wrap"
              }}
            >
                {render_items}
                {render_items.length >1 && <span onClick={number_click} className="img-centered-centered">{`+${render_items.length -1}`}</span>}
                
            </div>
            {(data.length > limit)   &&  <OpenButtonWithHook data={data} limit={limit} />}
          </LightgalleryProvider>
        ) : null}
      </div>
    </div>
  )
}

export default PhotoGallery


