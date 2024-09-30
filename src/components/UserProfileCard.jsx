import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta.js";


function UserProfileCard(props) {
    const {userInfo} = props;
    const username = userInfo[0].username;
    const email = userInfo[0].email;

  return (
    <div>
        <Card
            style={{
                width: 300,
        }}
            // cover={
            //   <img
            //     alt="example"
            //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            //   />
            // }
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
        >
        <Meta
          avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title={`${username}`}
          description={`email: ${email}`}
        />
        </Card>
    </div>
  )
}

export default UserProfileCard
