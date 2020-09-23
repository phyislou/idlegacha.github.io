import React, { useState, useEffect, Suspense } from 'react'
import { Button, Box, Avatar, Typography, LinearProgress, LinearProgressProps } from '@material-ui/core'

// 进度条组件
function LinearProgressWithLabel (props: LinearProgressProps & { value: number }) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2' color='textSecondary'>{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  )
}

// 处理进度条的显示
interface ProgressLabelProps {
  nowProgress: number,
  setNowProgress: (para: number) => void
  showCompleted: () => void
}

function ProgressLabel (props: ProgressLabelProps) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress: number) => (prevProgress >= 100 ? (function () {
        props.setNowProgress(-1)
        props.showCompleted()
        console.log('进度条完成')
        clearInterval(timer)
        return 100
      })() : (function () {
        let nowProgress = prevProgress + Math.random() * 10
        return nowProgress > 100 ? 100 : nowProgress
      })()))
    }, 300)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div style={{ width: '80%' }}>
      <LinearProgressWithLabel value={progress} />
    </div>
  )
}

function App () {
  // 设置一个初始值用来命名按钮
  const buttonName = [...Array(8)].map((val, ind) => ind)
  // 设置一个值来控制每一个按钮的进度条的进度（0~100），为-1时则不显示进度条
  // const [processState, setProcessState] = useState(-1)
  const [processState, setProcessState] = useState([...Array(8)].map(() => -1))
  // 设置一个值来显示完成图标
  // const [isCompleted, setIsCompleted] = useState(false)
  const [isCompleted, setIsCompleted] = useState([...Array(8)].map(() => false))

  /* function setNowProgress (newProgress: number) {
    let processStateTemp = processState
    processStateTemp = newProgress
    setProcessState(processStateTemp)
    console.log(`变成${processState}了`)
  } */

  // 输入需要修改的进度在processState中的index，以及需要修改成的值
  function setNowProgress (ind: number, newProgress: number) {
    let processStateTemp = processState
    processStateTemp[ind] = newProgress
    setProcessState(processStateTemp)
    console.log(`${ind}号位变成${processState[ind]}了`)
  }

  function showCompleted (ind: number) {
    if (!isCompleted[ind]) {
      let isCompletedTemp = isCompleted
      isCompletedTemp[ind] = true
      setIsCompleted(isCompletedTemp)
    }
  }

  return (
    <div>
      {buttonName.map((val, ind) =>
        <div key={val}>
          <div style={{ display: 'flex' }}>
            <Button variant='contained' color='primary' onClick={() => {
              // 点击按钮后，判断当前序号的按钮在processState中对应的值是否为-1，-1则不显示进度条，不是-1则隐藏进度条
              processState[ind] === -1 ? setNowProgress(ind, 0) : setNowProgress(ind, -1)
            }}>
              {`点击开始-按钮${buttonName[ind]}`}
            </Button>
            {/* 显示完成图标 */isCompleted[ind] && <Avatar>完成</Avatar>}
          </div>
          {/* 显示进度条 */processState[ind] > -1 && <ProgressLabel
            nowProgress={0}
            setNowProgress={(nowProgress: number) => setNowProgress(ind, nowProgress)}
            showCompleted={() => showCompleted(ind)}
          />}
        </div>
      )}
    </div>
  )
}

export default App
