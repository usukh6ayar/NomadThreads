import { View, Text, StyleSheet, Button, Linking, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const brandDetails = {
  borgolj: {
    name: 'Бөргөлжин',
    description: 'Үндэсний хувцасны үйлдвэрлэгч. Гар урлал, соёлын өвийг хадгалсан бүтээгдэхүүн.',
    phone: '99112233',
    email: 'info@borgolj.mn',
    address: 'Улаанбаатар, Чингэлтэй дүүрэг, 1-р хороо, Жишээ гудамж 12-1',
    workHours: 'Да-Ба: 09:00 - 18:00',
    website: 'https://borgolj.mn',
  },
  zaya: {
    name: 'Заяа',
    description: 'Гоёл чимэглэл, handmade эдлэлүүд.',
    phone: '99887766',
    email: 'contact@zaya.mn',
    address: 'УБ, Баянзүрх, 5-р хороо, 15-р байр',
    workHours: 'Дав-Баа: 10:00 - 19:00',
    website: 'https://zaya.mn',
  },
};

export default function BrandDetailScreen() {
  const { id } = useLocalSearchParams();
  const brand = brandDetails[id];

  if (!brand) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Брэнд олдсонгүй</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{brand.name}</Text>
      <Text>{brand.description}</Text>
      <Text style={styles.section}>Хаяг: {brand.address}</Text>
      <Text>Цагийн хуваарь: {brand.workHours}</Text>
      <Button title="Залгах" onPress={() => Linking.openURL(`tel:${brand.phone}`)} />
      <Button title="И-мэйл бичих" onPress={() => Linking.openURL(`mailto:${brand.email}`)} />
      <Button title="Вэбсайт" onPress={() => Linking.openURL(brand.website)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
  },
});
