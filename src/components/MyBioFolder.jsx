import UseContext from '../Context'
import { useContext, useState } from "react";
import Draggable from 'react-draggable'
import { motion } from 'framer-motion';
import MyBio from '../assets/pc.png'
import bioPC from '../assets/bio_pc.png'
import tech from '../assets/tech.png'
import hobby from '../assets/hobby.png'
import '../css/MyBioFolder.css'


function MyBioFolder() {

  const [generalTap, setGenerapTap] = useState(true)
  const [technologyTap, setTechnologyTap] = useState(false)
  const [hobbTap, setHobbTap] = useState(false)

  const { 
    themeDragBar,
    MybioExpand, setMybioExpand,
    StyleHide,
    isTouchDevice,
    handleSetFocusItemTrue,
    inlineStyleExpand,
    inlineStyle,
    deleteTap,
   } = useContext(UseContext);

   const technologyText = ( // don't have to use DangerousHTML
    <>
        I mainly use <span>JavaScript</span> and <span>React</span> 
        to create user-friendly interfaces, often incorporating <span>Tailwind</span> CSS for styling. 
        By bringing together the front end for seamless applications.
    </>
  );

  const bioText = ( // don't have to use DangerousHTML
    <>
        <strong>Objective:</strong>
        <br />
        <span>Building pixel perfect web </span>
        <span>application.</span>
        <br />
        <br />
        <strong>Information:</strong>
        <br />
        <span>Arturo Reyes</span>
        <br />
        <span>Frontend developer</span>
        <br />
        <span>+52 664-421-6404</span>
        <br />
        <br />
        <strong>Location: </strong>
        <br />
        <span>Tijuana, Baja California, México</span>
        <br />
        <span>Open to work</span>
        <br />
        <span>On Site / Remote</span>
    </>
  );

  const hobbyText = ( // don't have to use DangerousHTML
    <>
        In my free time, I love gaming with friends. 
        When I'm not at my computer, I make an effort 
        to hit the gym, discover new restaurants, 
        and go on adventures like hiking. 
    </>
  );

  ""

   const bioText2 = {
    General: [
        {
            text1: "Objective:",
            text2: "Building pixel perfect web",
            text3: "application.",
            text4: "Register to:",
            text5: "Arturo Reyes",
            text6: "Front-end developer",
            text7: "+52 664-421-6404",
            text8: "Location:",
            text9: "80486",
            text10: "16.0MB RAM",
         
        },
        {
            text1: technologyText,
         
      },
        {
            text1: "In my free time, I enjoy playing video games with friends. If I'm not in front of a computer, I will try to drag myself to the gym, try new restaurants, and embark on adventures like hiking.",
           
        }
    ]
};

      function handleDragStop(event, data) {
        const positionX = data.x 
        const positionY = data.y
        setMybioExpand(prev => ({
          ...prev,
          x: positionX,
          y: positionY
        }))

      }


  function handleBiotap(name) {
    setGenerapTap(name === 'general');
    setTechnologyTap(name === 'technology');
    setHobbTap(name === 'hobby');
  }

  const activeBtnStyle = {
    bottom: '2px',
    outline: '1px dotted black',
    outlineOffset: '-5px',
    borderBottomColor: '#c5c4c4',
    zIndex: '3'
  };

  function textShow(index) {
  const selectedText = bioText.General[generalTap ? bioText2 : technologyTap ? 1 : 2];
  return selectedText[`text${index}`];
}

//   function textShow(index) {
//   const selectedText = bioText.General[generalTap ? 0 : technologyTap ? 1 : 2];
//   return selectedText[`text${index}`];
// }
  
  
  
  

  return (
    <>
      <Draggable
        axis="both" 
        handle={'.folder_dragbar'}
        grid={[1, 1]}
        scale={1}
        disabled={MybioExpand.expand}
        bounds={{top: 0}}
        defaultPosition={{ 
          x: window.innerWidth <= 500 ? 35 : 70,
          y: window.innerWidth <= 500 ? 35 : 40,
        }}
        onStop={(event, data) => handleDragStop(event, data)}
        onStart={() => handleSetFocusItemTrue('My Bio')}
      >
        <motion.div className='bio_folder' 
            onClick={(e) => {
              e.stopPropagation();
              handleSetFocusItemTrue('My Bio');
            }}
            style={ MybioExpand.expand ? inlineStyleExpand('My Bio') : inlineStyle('My Bio')}>
          <div className="folder_dragbar"
             style={{ background: MybioExpand.focusItem? themeDragBar : '#757579'}}
          >
            <div className="bio_barname">
              <img src={MyBio} alt="MyBio" />
              <span>My Bio</span>
            </div>
            <div className="bio_barbtn">
              <div onClick={ !isTouchDevice ? (e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('My Bio')
              } : undefined
              }   
                onTouchEnd={(e) => {
                e.stopPropagation()
                setMybioExpand(prev => ({...prev, hide: true, focusItem: false}))
                StyleHide('My Bio')
              }}

              >
                <p className='dash'></p>
              </div>

                <div>
                <p className='x'
                  onClick={!isTouchDevice ? () => deleteTap('My Bio')
                  : undefined}
                  onTouchEnd={() => deleteTap('My Bio')}
                >x
                </p>
              </div>
            </div>
          </div>
          <div className="file_tap_container-bio">
          <p  onClick={() => handleBiotap('general')}
              style={generalTap ? activeBtnStyle : {}}
          >General
          </p>
          <p onClick={() => handleBiotap('technology')}
              style={technologyTap ? activeBtnStyle : {}}
          >Technology
          </p>
          <p onClick={() => handleBiotap('hobby')}
                  style={hobbTap ? activeBtnStyle : {}}
          >Hobby
          </p>
          </div>
          <div className="folder_content">
            <div className="folder_content-bio"
              style={{ display: generalTap ? 'grid' : 'block' }}
            >
              
            {/* <h1 className='bio_h1'>{textShow(true)}</h1> */}
            <img
              alt="bioPC"
              className={generalTap ? 'bio_img' : 'bio_img_other'}
              src={generalTap? bioPC : (technologyTap ? tech : hobby)}
            />
            <div
              className="biotext_container">

              <p className={generalTap? 'bio_text_1' : 'bio_text_1_other'}>
                {generalTap? bioText : technologyTap? technologyText : hobbyText}
              </p>   
            </div>
           
              {/* {generalTap && (
                <div className='cv_container'>
                  <a className='bio_cv' href="https://drive.google.com/file/d/1XNn23UA2L82P2__Ccuccl3WMdR2rHG57/view" target="_blank" rel="noreferrer" >
                Click to view my CV.
              </a>
              <a className='bio_download' href="https://drive.usercontent.google.com/u/0/uc?id=1XNn23UA2L82P2__Ccuccl3WMdR2rHG57&export=download" target="_blank" rel="noreferrer" >
                Download
              </a>
                </div>
              )} */}
              
            </div>
            <div className="bio_btn_container">
              <div className="bio_btn_ok"
              onClick={!isTouchDevice ? () => deleteTap('My Bio') : undefined}
              onTouchEnd={() => deleteTap('My Bio')}
              >
                <span>
                  OK
                </span>
              </div>
              <div className="bio_btn_cancel"
              onClick={!isTouchDevice ? () => deleteTap('My Bio') : undefined}
              onTouchEnd={() => deleteTap('My Bio')}
              ><span>Cancel</span></div>
            </div>
          </div>
        </motion.div>
      </Draggable>
    </>
  )
}          

export default MyBioFolder
