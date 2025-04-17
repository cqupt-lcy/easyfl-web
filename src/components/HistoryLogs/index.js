import React, { useEffect, useState } from 'react';
import { Avatar, Divider, List, Skeleton, message } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { request } from '../../api/axios/request';
import GetTaskNameById from '../../tools/useGetTaskNameById';
import { useSelector } from 'react-redux';
const App = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState([]);
  const tasks = useSelector(state => state.tasks.tasks)
  async function loadMoreData() {
    if (loading) {
      return;
    }
    setLoading(true);

    try {
      const res = await request.get('/getlogs')
      if (res.status === 'success') {
        setLogs(res.logs)
      } else {
        message.error('获取日志失败')
      }
    } catch (err) {
      console.error('获取日志出错:', err)
      message.error('服务器连接失败')
    } finally {
      setLoading(false)
    }
  };
  const handleDelete = (file) => {

  }
  const handleDownload = (file) => {
    
  }
  useEffect(() => {
    loadMoreData()
  }, []);
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={logs.length}
        next={loadMoreData}
        hasMore={logs.length < 1}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多日志了~</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={logs}
          renderItem={item => (
            <List.Item key={item.taskId}>
              <List.Item.Meta
                title={<span >{GetTaskNameById(tasks, item.taskId)}</span>}
                description={item.time}
              />
              <div style={{ marginRight: "20px", color: "red" }} onClick={handleDelete(item.file)}>删除</div>
              <div onClick={handleDownload(item.file)}>下载日志</div>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  );
};
export default App;
