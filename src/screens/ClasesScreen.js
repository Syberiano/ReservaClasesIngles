import React, { useState, useMemo, useEffect } from "react";
import { View, Text,  Pressable,  StyleSheet, Image, TextInput,  ScrollView, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import LabelLevel from "../components/LabelLevel";
import NivelChip from "../components/NivelChip";
import EstadoVacio from "../components/EstadoVacio";
import Card from "../components/Card";
import useResponsive from "../hooks/useResponsive";
import { colors, radius, spacing, typography } from "../theme";
import { formatearPrecio, CLASES, NIVELES } from "../data/classes";

/*todos los screen necesitan la variable navigation, esto para cambiarse entre pantallas en cualquier momento
se instala la librería en este orden: 
1. npx expo install @react-navigation/native
2. npx expo install @react-navigation/native-stack
3. npx expo install @react-navigation/bottom-tabs
*/

export default function ClasesScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { columnas, paddingHorizontal, anchoTarjeta } = useResponsive();
  const [nivel, setNivel] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const resultados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLocaleLowerCase();

    return CLASES.filter((clase) => {
      const coincidenciaNivel = nivel === "Todos" || clase.nivel === nivel;
      const coincidenciaTexto =
        !textoBusqueda ||
        clase.titulo?.toLocaleLowerCase().includes(textoBusqueda) ||
        clase.profesor?.nombre?.toLocaleLowerCase().includes(textoBusqueda);

      return coincidenciaNivel && coincidenciaTexto;
    });
  }, [nivel, busqueda]);

  return (
    <View style={[styles.pantalla, { paddingTop: insets.top + spacing.md }]}>
      <View>
        <Text style={styles.titulo}>Aplicación para clase de Inglés</Text>
        <Ionicons name="search" size={18} color={colors.textoSuave} />
        <TextInput
          placeholder="Buscar"
          value={busqueda}
          onChangeText={setBusqueda}
          autoCorrect={false}
        />
        {busqueda.length > 0 && (
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textoSuave}
            onPress={() => setBusqueda("")}
          />
        )}
      </View>
      <ScrollView styles ={{ flexGrow: 0 }} horizontal>
        {NIVELES.map((item) => (
          <NivelChip
            key={item}
            etiqueta={item}
            activo={nivel === item}
            onPress={() => setNivel(item)}
          />
        ))}
      </ScrollView>
      <FlatList
        data={resultados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return (
            <Card
              clase={item}
              onPress={() =>
                navigation.navigate("DetalleClase", { clase: item })
              }
              showVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal,
                flexGrow: 1,
              }}
            />
          );
        }}
        numColumns={columnas}
        ListEmptyComponent={
          <EstadoVacio
            icono="search-outline"
            titulo="No encontramos resultados"
            mensaje="La combinación de búsqueda no tiene resultados"
            onAction={() => {
              (setNivel("Todos"), setBusqueda(""));
            }}
          />
        }
      />
      {/* Agregar la opción */}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borde,
    marginBottom: spacing.md,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 150,
  },
  contenido: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  titulo: {
    ...typography.subtitulo,
    marginTop: spacing.xs,
  },
  profesor: {
    ...typography.cuerpo,
    fontWeight: "600",
    marginTop: spacing.sm,
  },
  horario: {
    ...typography.secundario,
    lineHeight: 18,
  },
  precio: {
    ...typography.cuerpo,
    fontWeight: "700",
    color: colors.primario,
  },
});
