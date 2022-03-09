import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import arrow from './../assets/images/arrow.png'
import { create } from '../_services/index'


const useStyles = makeStyles(theme => ({
  App: {
    margin: theme.spacing(10)
  },
  textField: {
    marginRight: theme.spacing(1),
    width: 300,
  },
  croppedContainer: {
    display: 'inline'
  },
  croppedLeftChild: {
    width: '25%',
    float: "left",
    padding: theme.spacing(1)    
  },
  croppedMiddleChild: {
    width: '5%',
    float: "left",
    marginTop: theme.spacing(24)    
  },
  croppedMiddleChildImg: {
    width: '50px',
    height: '50px',    
  },
  croppedRightChild: {
    width: '60%',
    float: "left",
    padding: theme.spacing(1)    
  },
  croppedImage: {
    border: '2px solid gray'
  },
  croppedBottomClear: {
    clear: "both"
  },
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CropImage() {
    const classes = useStyles();
    const [upImg, setUpImg] = useState();

    const [values, setValues] = useState({
      name: '',
      fingerWidth: 0,
      fingerHeight: 0,
      fingerStroke: 0,
      graspImage: '',
      message: '',
      severity: 'success'
    })
  
    const handleChange = name => event => {
      setValues({ ...values, [name]: event.target.value })
    }
  
    const clickSave = (canvas) => {
      debugger;

      clickApplyGrasp(canvas, values);

      const graspData = {
        name: values.name || undefined,
        fingerWidth: values.fingerWidth || undefined,
        fingerHeight: values.fingerHeight || undefined,
        fingerStroke: values.fingerStroke || undefined,
        graspImage: canvas.toDataURL() || undefined
      }
      create(graspData).then((data) => {
        if (data.error) {
          values.message = data.error;
          values.severity = 'error';
          handleClick();
        } else {
          values.message = data.message;
          values.severity = 'success';
          handleClick();
        }
      })
    }

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState({ unit: '%', width: 30 });
    const [completedCrop, setCompletedCrop] = useState(null);
  
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
        reader.addEventListener('load', () => setUpImg(reader.result));
        reader.readAsDataURL(e.target.files[0]);
      }
    };
  
    const onLoad = useCallback((img) => {
      imgRef.current = img;
    }, []);
  
    useEffect(() => {
      if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
        return;
      }
  
      const image = imgRef.current;
      const canvas = previewCanvasRef.current;
      const crop = completedCrop;
  
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const ctx = canvas.getContext('2d');
      const pixelRatio = window.devicePixelRatio;
  
      canvas.width = crop.width * pixelRatio;
      canvas.height = crop.height * pixelRatio;
  
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.imageSmoothingQuality = 'high';
  
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }, [completedCrop]);

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    return (
      <div className={classes.App}>
        <div>
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <br></br>
        <span>Cropped Image Preview:</span><br/>
        <div>
            <div className={classes.croppedLeftChild}>
              <TextField id="fingerWidth" label="Finger Width" className={classes.textField} value={values.fingerWidth} onChange={handleChange('fingerWidth')} margin="normal"/><br/>
              <TextField id="fingerHeight" label="Finger Height" className={classes.textField} value={values.fingerHeight} onChange={handleChange('fingerHeight')} margin="normal"/><br/>
              <TextField id="fingerStroke" label="Finger Stroke" className={classes.textField} value={values.fingerStroke} onChange={handleChange('fingerStroke')} margin="normal"/><br/>

              <TextField id="fingerLeftPositionX" label="Left Finger Position X" className={classes.textField} value={values.fingerLeftPositionX} onChange={handleChange('fingerLeftPositionX')} margin="normal"/><br/>
              <TextField id="fingerLeftPositionY" label="Left Finger Position Y" className={classes.textField} value={values.fingerLeftPositionY} onChange={handleChange('fingerLeftPositionY')} margin="normal"/><br/>
              
              <TextField id="fingerRightPositionX" label="Right Finger Position X" className={classes.textField} value={values.fingerRightPositionX} onChange={handleChange('fingerRightPositionX')} margin="normal"/><br/>
              <TextField id="fingerRightPositionY" label="Right Finger Position Y" className={classes.textField} value={values.fingerRightPositionY} onChange={handleChange('fingerRightPositionY')} margin="normal"/><br/>

              <button type="button"
                disabled={!completedCrop?.width || !completedCrop?.height}
                onClick={() => clickApplyGrasp(previewCanvasRef.current, values) }
              >
                Apply Grasp Value
              </button>
            </div>
            <div className={classes.croppedMiddleChild}>
              <img src={arrow} className={classes.croppedMiddleChildImg}></img>
            </div>
            <div className={classes.croppedRightChild}>
              <canvas className={classes.croppedImage}
                ref={previewCanvasRef}
                // Rounding is important so the canvas width and height matches/is a multiple for sharpness.
                style={{
                  width: Math.round(completedCrop?.width ?? 0),
                  height: Math.round(completedCrop?.height ?? 0)
                }}
              />
            </div>
        </div>
        <br/>
        <div className={classes.croppedBottomClear}>
          <TextField id="name" label="Cropped Image Name" className={classes.textField} value={values.name} onChange={handleChange('name')} margin="normal"/><br/>
          <button
            type="button"
            disabled={!completedCrop?.width || !completedCrop?.height}
            onClick={() => clickSave(previewCanvasRef.current) }
          >
            Save cropped image
          </button>
        </div>
        <div className={classes.root}>
          <Snackbar open={open} autoHideDuration={6000000} message={values.message} onClose={handleClose}>
            <Alert onClose={handleClose} severity={values.severity}>
              {values.message}
            </Alert>
          </Snackbar>
        </div>
      </div>
    );
}

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

var lstOfPreviousFingers = [];
function clickApplyGrasp(canvas, values) {
  if(!canvas) {
    alert('Some error with canvas');
  }
  else {
    console.log(canvas);
    //alert('Canvas has been logged on to console.');
    var ctx = canvas.getContext('2d');
    if(lstOfPreviousFingers.length > 0)
    {
      for(let i = 0; i < lstOfPreviousFingers.length; i++)
      {
        let finger = lstOfPreviousFingers[i];
        ctx.clearRect(parseInt(finger.fingerLeftPositionX) - parseInt(finger.fingerStroke), parseInt(finger.fingerLeftPositionY) - parseInt(finger.fingerStroke), parseInt(finger.fingerWidth) + parseInt(finger.fingerStroke) + 1, parseInt(finger.fingerHeight) + parseInt(finger.fingerStroke) + 1);
        ctx.clearRect(parseInt(finger.fingerRightPositionX) - parseInt(finger.fingerStroke), parseInt(finger.fingerRightPositionY) - parseInt(finger.fingerStroke), parseInt(finger.fingerWidth) + parseInt(finger.fingerStroke) + 1, parseInt(finger.fingerHeight) + parseInt(finger.fingerStroke) + 1);
      }
      lstOfPreviousFingers = [];
    }
    ctx.beginPath();
    ctx.lineWidth = values.fingerStroke;
    ctx.fillStyle = 'lawngreen';
    ctx.rect(values.fingerLeftPositionX, values.fingerLeftPositionY, values.fingerWidth, values.fingerHeight);
    ctx.rect(values.fingerRightPositionX, values.fingerRightPositionY, values.fingerWidth, values.fingerHeight);
    ctx.fill();
    ctx.stroke();
    lstOfPreviousFingers.push(values);
  }
}