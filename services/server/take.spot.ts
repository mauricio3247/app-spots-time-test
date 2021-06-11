import firestore from '../../helpers/server/firestore.server';
export const takeSpot = async (userId:string, newTime:string) => {
    try {
        await firestore.collection('moto_register').doc(userId).delete()
        if(newTime !== '') {
            await firestore.collection('moto_register').doc(userId).set({
                user_id: userId,
                time: newTime
            })
        }
    } catch (error) {
        console.error('error', error)
    }
}
