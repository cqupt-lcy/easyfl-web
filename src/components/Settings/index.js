import React, { useState } from "react"
import { Select, InputNumber, Button, Modal, Popconfirm, notification } from "antd"
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useSelector } from "react-redux"
import './index.css'

export default function Settings({ task, onUpdateParam, onStart, onStop, onReset }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [api, contextHolder] = notification.useNotification()
  const connected = useSelector(state => state.states.connected)
  const training = task.status.training
  const openNotification = (msg) => {
    api.open({
      message: '提示信息',
      description: msg,
      duration: 4.5,
    });
  }
  const handleStart = async () => {
    if (!connected) {
      alert("服务器未连接!!")
    }
    else if (connected && training) {
      alert("该任务已经在训练!!")
    }
    else if (connected && !training) {
      await onStart().then(() => {
        openNotification("训练开始")
        setIsModalOpen(false)
      })
        .catch(err => {
          console.warn("请求错误", err);
          alert("请求错误", err)
        })
    }
  }
  const handleStop = async () => {
    if(!connected){
      alert("服务器未连接!!")
    }
    else if(connected && !training){
      alert("该任务没有进行中的训练!!")
    }
    else if(connected && training){
      await onStop().then(() => {
        openNotification("训练终止")
      })
        .catch(err => {
          console.warn((`请求错误${err}`));
          alert("请求错误", err)
        })
    }
    
  }

  const methodOptions = [
    { value: 'fedavg', label: 'FedAvg' },
    { value: 'fedprox', label: 'FedProx' },
    { value: 'ca2fl', label: 'Ca2Fl' },
    { value: 'fedasync', label: 'FedAsync' },
    { value: 'fedavgm', label: 'FedAvgm' },
    { value: 'fedbuff', label: 'FedBuff' },
    { value: 'fedtest01', label: 'FedTest' },
  ]

  const datasetOptions = [
    { value: 'BloodMnist', label: 'BloodMnist' },
    { value: 'PathMnist', label: 'PathMnist' },
    { value: 'ISIC2017', label: 'ISIC2017' },
    { value: 'Cifar10', label: 'Cifar-10' },
    { value: 'Cifar100', label: 'Cifar-100' },
  ]

  return (
    <div className="settingwrapper">
      {contextHolder}
      <h2 style={{ marginBottom: 16 }}>联邦学习训练控制</h2>

      <div className="settingdiv1">
        <label>方法：
          <Select className="settingselection" value={task.parameters.method}
            onChange={(v) => onUpdateParam('method', v)}
            options={methodOptions}
          />
        </label>
        <label>异质性：
          <Select className="settingselection" value={task.parameters.heterogeneity}
            onChange={(v) => onUpdateParam('heterogeneity', v)}>
            <Select.Option value={true}>非独立同分布</Select.Option>
            <Select.Option value={false}>独立同分布</Select.Option>
          </Select>
        </label>
        <label>训练方式：
          <Select className="settingselection" value={task.parameters.isAsync}
            onChange={(v) => onUpdateParam('isAsync', v)}>
            <Select.Option value={true}>异步训练</Select.Option>
            <Select.Option value={false}>同步训练</Select.Option>
          </Select>
        </label>
        <label>数据集：
          <Select className="settingselection" value={task.parameters.dataset}
            onChange={(v) => onUpdateParam('dataset', v)}
            options={datasetOptions}
          />
        </label>
      </div>

      <div className="settingdiv2">
        <label>学习率：
          <InputNumber min={0} max={10} step={0.01} value={task.parameters.learningRate}
            onChange={(v) => onUpdateParam('learningRate', v)} />
        </label>
        <label>狄利特雷系数：
          <InputNumber min={0} max={10} step={0.1} value={task.parameters.dirichlet}
            onChange={(v) => onUpdateParam('dirichlet', v)} />
        </label>
        <label>客户端数量：
          <InputNumber min={1} max={10000} step={1} value={task.parameters.clientNum}
            onChange={(v) => onUpdateParam('clientNum', v)} />
        </label>
      </div>

      <div className="settingbutton">
        <Button type="primary" onClick={() => setIsModalOpen(true)}>开始训练</Button>

        <Popconfirm title="确定停止当前训练？" onConfirm={() => { handleStop() }} icon={<QuestionCircleOutlined style={{ color: 'red' }} />}>
          <Button danger style={{ marginLeft: 12 }}>停止训练</Button>
        </Popconfirm>

        <Button onClick={onReset} style={{ marginLeft: 12 }}>恢复默认</Button>
        <Button onClick={() => console.log(task)} style={{ marginLeft: 12 }}>打印设置</Button>
      </div>

      <Modal title="确认开始训练？" open={isModalOpen}
        onOk={handleStart}
        onCancel={() => setIsModalOpen(false)} >
        {Object.entries(task.parameters).map(([key, value]) => (
          <p key={key}>{key}：{value.toString()}</p>
        ))}
      </Modal>
    </div>
  )
}
