import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Button, Layout } from 'antd';
import { GetServerSidePropsContext } from 'next';
import { authRequired } from '../helpers/server/auth.required';
import { firebaseClient } from '../helpers/client/firebase.client';
import Text from 'antd/lib/typography/Text';
import { ItemLayout } from '../components/ItemLayout';
import { generateSpotBoard } from '../services/server/generate.spot.borad';
import { Board } from '../components/Board';

type Data = {
  time: string,
  taken: number,
  total: number,
  items: any[]
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const user = await authRequired(ctx)
  if (user === undefined) {
    return { props: {} as never };
  }
  return {
    props: {
      authUserId: user.uid,
      initData: await generateSpotBoard(),
    }
  }
}

export default ({ initData, authUserId }: { initData: Data[], authUserId: string }) => {
  const { user } = useAuth();

  const [dataTime, setDataTime] = useState<Data[]>(initData)

  if (typeof window !== undefined) {
    useEffect(() => {
      firebaseClient.firestore().collection('dashboard').onSnapshot((querySnapshot) => {
        const data: any = querySnapshot.docs.map(item => item.data()).filter(item => item !== null && item !== undefined)
        setDataTime(data)
      })

    }, [])
  }


  return (

    <Layout style={{ backgroundColor: 'white' }}>
      <Layout.Content style={{ margin: '24px 16px 0', textAlign: 'center' }}>
        <ItemLayout>
          <>

            <Text>{`User ID: ${user ? user.uid : 'no user signed in'}`} </Text>
            <Button
              danger
              onClick={async () => {
                await firebaseClient.auth().signOut()
                window.location.href = '/login';
              }}
            > Logout </Button>
            <br></br>
            <Text type="success">App to take spot in schedule board, tap one card to take or release a spot, the limit to every spot is 8 users. </Text>

          </>
        </ItemLayout>

        <Board authUserId={authUserId} dataTime={dataTime}></Board>



      </Layout.Content>
    </Layout>



  );
};



