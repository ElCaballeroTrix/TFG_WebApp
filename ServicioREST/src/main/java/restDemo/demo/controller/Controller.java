package restDemo.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import restDemo.demo.model.*;
import restDemo.demo.model.MOCA.*;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin
@RestController
@RequestMapping(value="api/user")
public class Controller {
    private Connection connection;
    @GetMapping(value ="/test")
    public ResponseEntity<String> testGet(){
        return ResponseEntity.status(HttpStatus.OK).body("Test Get Ejecutado");
    }

    //-------------------------------------------------------
    //-------------Usuario----------------------
    @PostMapping(value ="/usuarios")
    public ResponseEntity<String> testUsuarios(@RequestBody Usuario usuario){
        //---BBDD--
        connectionBBDD();
        PreparedStatement pst=null;
        String sql="INSERT INTO usuario VALUES(?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setString(1,usuario.getUsuario());
            pst.setString(2, usuario.getEstudios());
            pst.setString(3, usuario.getSexo());
            pst.setDate(4, java.sql.Date.valueOf(usuario.getNacimiento()));
            pst.setDate(5,java.sql.Date.valueOf(usuario.getFecha()));
            pst.setInt(6,usuario.getEdad());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir un usuario:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }

        //---
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de Usuarios Ejecutado");
    }
    @GetMapping(value ="/usuarios")
    public ResponseEntity<ArrayList<Usuario>> testGetUsuarios(){
        ArrayList<Usuario> usuarios=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from usuario;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                Usuario usuario=new Usuario(rs.getString("nombreUsuario"),
                        rs.getString("estudios"),
                        rs.getString("sexo"),
                        rs.getDate("fechaNacimiento").toLocalDate(),
                        rs.getDate("fecha").toLocalDate(),
                        rs.getInt("edad"));
                usuarios.add(usuario);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar usuarios: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(usuarios);
    }
    //***************************************************************************************************************************************************************************************
    //-------------Parejas----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/parejas")
    public ResponseEntity<String> testPostParejas(@RequestBody Parejas parejas){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO parejas(tiempo, movimientos, nivel,aciertos,ppi,casillaSeleccionada1, casillaSeleccionada2,casillaValida,tablero, usuario ) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)parejas.getTiempo());
            pst.setInt(2, parejas.getMovimientos());
            pst.setInt(3, parejas.getNivel());
            pst.setInt(4, parejas.getAciertos());
            pst.setDouble(5,parejas.getPpi());
            pst.setString(6,"("+parejas.getCasillaSelecciona1().getFila()+","+parejas.getCasillaSelecciona1().getColumna()+")");
            pst.setString(7,"("+parejas.getCasillaSelecciona2().getFila()+","+parejas.getCasillaSelecciona2().getColumna()+")");
            pst.setString(8,"("+parejas.getCasillaValida().getFila()+","+parejas.getCasillaValida().getColumna()+")");
            pst.setString(9, parejas.getTablero().toString());
            pst.setString(10,parejas.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en Parejas:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de Parejas Ejecutado");
    }
    @GetMapping(value ="/parejas")
    public ResponseEntity<ArrayList<Parejas>> testGetParejas(){
        ArrayList<Parejas> parejasList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from parejas;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String fila1=rs.getString("casillaSeleccionada1").split(",")[0].split("\\(")[1];
                String columna1=rs.getString("casillaSeleccionada1").split(",")[1].split("\\)")[0];
                Casilla casilla1=new Casilla(Integer.parseInt(fila1),Integer.parseInt(columna1));
                String fila2=rs.getString("casillaSeleccionada2").split(",")[0].split("\\(")[1];
                String columna2=rs.getString("casillaSeleccionada2").split(",")[1].split("\\)")[0];
                Casilla casilla2=new Casilla(Integer.parseInt(fila2),Integer.parseInt(columna2));
                String filaV=rs.getString("casillaValida").split(",")[0].split("\\(")[1];
                String columnaV=rs.getString("casillaValida").split(",")[1].split("\\)")[0];
                Casilla casillaV=new Casilla(Integer.parseInt(filaV),Integer.parseInt(columnaV));
                String tablero=rs.getString("tablero").substring(1,rs.getString("tablero").length()-1);
                Parejas parejas=new Parejas(rs.getString("usuario"),
                        rs.getInt("tiempo"),
                        rs.getInt("movimientos"),
                        rs.getInt("nivel"),
                        rs.getInt("aciertos"),
                        casilla1,
                        casilla2,
                        casillaV,
                        rs.getDouble("ppi"),
                        Arrays.stream(tablero.split(",\\s"))
                            .map(Integer::parseInt)
                            .collect(Collectors.toList())
                );
                parejasList.add(parejas);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar Parejas: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(parejasList);
    }
    //***************************************************************************************************************************************************************************************
    //-------------ArrastraYSuelta----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/arrastraySuelta")
    public ResponseEntity<String> testPostArrastraYSueltas(@RequestBody ArrastraYSuelta arrastraYSuelta){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO arrastraysuelta(tiempo, movimientos, nivel,nombreElementoEscogido,aciertos,ppi,casillaSeleccionada, casillaValida,listaObjetos,listaCajas, usuario ) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)arrastraYSuelta.getTiempo());
            pst.setInt(2, arrastraYSuelta.getMovimientos());
            pst.setInt(3, arrastraYSuelta.getNivel());
            pst.setString(4, arrastraYSuelta.getNombreElementoEscogido());
            pst.setInt(5, arrastraYSuelta.getAciertos());
            pst.setDouble(6,arrastraYSuelta.getPpi());
            pst.setString(7,"("+arrastraYSuelta.getCasillaSelecciona().getFila()+","+arrastraYSuelta.getCasillaSelecciona().getColumna()+")");
            pst.setString(8,"("+arrastraYSuelta.getCasillaValida().getFila()+","+arrastraYSuelta.getCasillaValida().getColumna()+")");
            pst.setString(9, arrastraYSuelta.getListaObjetos().toString());
            pst.setString(10, arrastraYSuelta.getListaCajas().toString());
            pst.setString(11,arrastraYSuelta.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en ArrastraYSuelta:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de ArrastraYSuelta Ejecutado");
    }
    @GetMapping(value ="/arrastraySuelta")
    public ResponseEntity<ArrayList<ArrastraYSuelta>> testGetArrastraYSuelta(){
        ArrayList<ArrastraYSuelta> arrastraYSueltaList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from arrastraysuelta;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String filaS=rs.getString("casillaSeleccionada").split(",")[0].split("\\(")[1];
                String columnaS=rs.getString("casillaSeleccionada").split(",")[1].split("\\)")[0];
                Casilla casillaS=new Casilla(Integer.parseInt(filaS),Integer.parseInt(columnaS));
                String filaV=rs.getString("casillaValida").split(",")[0].split("\\(")[1];
                String columnaV=rs.getString("casillaValida").split(",")[1].split("\\)")[0];
                Casilla casillaV=new Casilla(Integer.parseInt(filaV),Integer.parseInt(columnaV));
                String listaObjetos=rs.getString("listaObjetos").substring(1,rs.getString("listaObjetos").length()-1);
                String listaCajas=rs.getString("listaCajas").substring(1,rs.getString("listaCajas").length()-1);

                ArrastraYSuelta arrastraYSuelta=new ArrastraYSuelta(rs.getString("usuario"),
                        rs.getInt("tiempo"),
                        rs.getInt("movimientos"),
                        rs.getInt("nivel"),
                        rs.getInt("aciertos"),
                        rs.getString("nombreElementoEscogido"),
                        casillaS,
                        casillaV,
                        Arrays.stream(listaObjetos.split(",\\s"))
                                .collect(Collectors.toList()),
                        Arrays.stream(listaCajas.split(",\\s"))
                                .collect(Collectors.toList()),
                        rs.getDouble("ppi")

                );
                arrastraYSueltaList.add(arrastraYSuelta);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar ArrastraYSuelta: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(arrastraYSueltaList);
    }
    //***************************************************************************************************************************************************************************************
    //-------------Recuera Palabras----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/recuerdaPalabras")
    public ResponseEntity<String> testPostMemoria(@RequestBody Memoria memoria){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO recuerdaPalabras(tiempo, movimientos, nivel,aciertos, temporizador,casillaSeleccionada, casillasValidas,ppi,tablero, usuario ) " +
                "VALUES(?,?,?,?,?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)memoria.getTiempo());
            pst.setInt(2, memoria.getMovimientos());
            pst.setString(3, memoria.getNivel());
            pst.setInt(4, memoria.getAciertos());
            pst.setString(5, memoria.getTemporizador());
            pst.setString(6,"("+memoria.getCasillaSelecciona().getFila()+","+memoria.getCasillaSelecciona().getColumna()+")");
            pst.setString(7,memoria.getCasillasValida().toString());
            pst.setDouble(8,memoria.getPpi());
            pst.setString(9, memoria.getTablero().toString());
            pst.setString(10,memoria.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en Recuerda Palabras:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de Recuerda Palabras Ejecutado");
    }
    @GetMapping(value ="/recuerdaPalabras")
    public ResponseEntity<ArrayList<Memoria>> testGetMemorias(){
        ArrayList<Memoria> memoriasList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from recuerdapalabras;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String filaS=rs.getString("casillaSeleccionada").split(",")[0].split("\\(")[1];
                String columnaS=rs.getString("casillaSeleccionada").split(",")[1].split("\\)")[0];
                Casilla casillaS=new Casilla(Integer.parseInt(filaS),Integer.parseInt(columnaS));
                String listaCasillasValidas=rs.getString("casillasValidas").substring(2,rs.getString("casillasValidas").length()-1);
                String tablero=rs.getString("tablero").substring(1,rs.getString("tablero").length()-1);
                List<String> tableroSinParentesis=Arrays.stream(listaCasillasValidas.split(",\\s\\("))
                        .collect(Collectors.toList());
                List<Casilla> casillasTablero=new ArrayList<>();
                for(int i=0;i<tableroSinParentesis.size();i++){
                    String filaV=tableroSinParentesis.get(i).split(",")[0];
                    String columnaV=tableroSinParentesis.get(i).split(",")[1].split("\\)")[0];
                    Casilla casillaV=new Casilla(Integer.parseInt(filaV),Integer.parseInt(columnaV));
                    casillasTablero.add(casillaV);
                }
                Memoria memoria=new Memoria(rs.getString("usuario"),
                        rs.getInt("tiempo"),
                        rs.getInt("movimientos"),
                        rs.getString("nivel"),
                        rs.getInt("aciertos"),
                        rs.getString("temporizador"),
                        casillaS,
                        casillasTablero,
                        rs.getDouble("ppi"),
                        Arrays.stream(tablero.split(",\\s"))
                                .collect(Collectors.toList())
                );
                memoriasList.add(memoria);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar Recuerda Palabras: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(memoriasList);
    }
    //***************************************************************************************************************************************************************************************
    //-------------Torres----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/torre")
    public ResponseEntity<String> testPostTorre(@RequestBody Torre torre){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO NoqueaLasTorres(tiempo, casillaPulsada, casillaValida,ppi,nivel, fuerzaJugador,tablero, usuario ) " +
                "VALUES(?,?,?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)torre.getTiempo());
            pst.setString(2,"("+torre.getCasillaPulsada().getFila()+","+torre.getCasillaPulsada().getColumna()+")");
            pst.setString(3,"("+torre.getCasillaValida().getFila()+","+torre.getCasillaValida().getColumna()+")");
            pst.setDouble(4,torre.getPpi());
            pst.setInt(5, torre.getNivel());
            pst.setInt(6,torre.getFuerzaJugador());
            pst.setString(7, torre.getTablero().toString());
            pst.setString(8,torre.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en Noquea Las Torres:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de Noquea Las Torres Ejecutado");
    }
    @GetMapping(value ="/torre")
    public ResponseEntity<ArrayList<Torre>> testGetTorres(){
        ArrayList<Torre> torresList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from noquealastorres;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String fila1=rs.getString("casillaPulsada").split(",")[0].split("\\(")[1];
                String columna1=rs.getString("casillaPulsada").split(",")[1].split("\\)")[0];
                Casilla casilla1=new Casilla(Integer.parseInt(fila1),Integer.parseInt(columna1));
                String filaV=rs.getString("casillaValida").split(",")[0].split("\\(")[1];
                String columnaV=rs.getString("casillaValida").split(",")[1].split("\\)")[0];
                Casilla casillaV=new Casilla(Integer.parseInt(filaV),Integer.parseInt(columnaV));
                String tablero=rs.getString("tablero").substring(2,rs.getString("tablero").length()-1);
                List<String> tableroSinCorchetes=Arrays.stream(tablero.split(",\\s\\["))
                        .collect(Collectors.toList());
                List<List<String>> listaTablero=new ArrayList<>();
                for(int i=0;i<tableroSinCorchetes.size();i++){
                    List<String> elemento=new ArrayList<>();
                    elemento.add(tableroSinCorchetes.get(i).split("\\]")[0]);
                    listaTablero.add(elemento);
                }
                Torre torre=new Torre(rs.getInt("tiempo"),
                        rs.getString("usuario"),
                        casilla1,
                        casillaV,
                        rs.getDouble("ppi"),
                        rs.getInt("nivel"),
                        rs.getInt("fuerzaJugador"),
                        listaTablero
                );
                torresList.add(torre);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar Noquea Las Torres: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(torresList);
    }
    //***************************************************************************************************************************************************************************************
    //-------------CentroBola----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/centroBola")
    public ResponseEntity<String> testPostCentroBola(@RequestBody CentroBola centroBola){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO centroBola(tiempo, puntoPulsado, distanciaRespectoAlMedio,nivel,ppi, usuario ) " +
                "VALUES(?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)centroBola.getTiempo());
            double cmX=Math.round((centroBola.getPuntoPulsado().getX()*(2.54/ centroBola.getPpi()))*100.0)/100.0;
            double cmY=Math.round((centroBola.getPuntoPulsado().getY()*(2.54/ centroBola.getPpi()))*100.0)/100.0;
            System.out.println("EJEM: "+centroBola.getPuntoPulsado().getX()+", en cm: "+cmX+", y ppi: "+centroBola.getPpi());
            pst.setString(2,"("+cmX+","+cmY+")");
            double cm=centroBola.getDistanciaRespectoAlMedio()*(2.54/centroBola.getPpi());
            System.out.println("Buen: "+Math.round(cm*100.0)/100.0+" cm");
            pst.setString(3,Math.round(cm*100.0)/100.0+" cm");
            pst.setInt(4, centroBola.getNivel());
            pst.setDouble(5,centroBola.getPpi());
            pst.setString(6,centroBola.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en CentroBola:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de CentroBola Ejecutado");
    }
    @GetMapping(value ="/centroBola")
    public ResponseEntity<ArrayList<CentroBola>> testGetCentroBola(){
        ArrayList<CentroBola> centroBolaList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from centroBola;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String fila1=rs.getString("puntoPulsado").split(",")[0].split("\\(")[1];
                String columna1=rs.getString("puntoPulsado").split(",")[1].split("\\)")[0];
                Coordenadas coordenadas=new Coordenadas(Double.parseDouble(fila1),Double.parseDouble(columna1));
                double distancia=Double.parseDouble(rs.getString("distanciaRespectoAlMedio").split("\\scm")[0]);
                CentroBola centroBola=new CentroBola(rs.getInt("tiempo"),
                        rs.getString("usuario"),
                        coordenadas,
                        distancia,
                        rs.getDouble("ppi"),
                        rs.getInt("nivel")
                );
                centroBolaList.add(centroBola);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar CentroBola: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(centroBolaList);
    }
    //***************************************************************************************************************************************************************************************
    //-------------MetaBola----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/metaBola")
    public ResponseEntity<String> testPostEstadisticasCarreraBola(@RequestBody MetaBola metaBola){
        connectionBBDD();
        PreparedStatement pst=null;
        String sql = "INSERT INTO metaBola(tiempo, usuarioDetuvoLaBola,puntoPulsado, puntosValidos,distanciaRespectoAMeta,nivel,ppi, usuario ) " +
                "VALUES(?,?,?,?,?,?,?,?);";
        try {
            pst=connection.prepareStatement(sql);
            pst.setInt(1,(int)metaBola.getTiempo());
            pst.setBoolean(2,metaBola.isUsuarioDetuvoLaBola());
            double cmX=Math.round((metaBola.getPuntoPulsado().getX()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            double cmY=Math.round((metaBola.getPuntoPulsado().getY()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            pst.setString(3,"("+cmX+","+cmY+")");
            double mayorQuecmX=Math.round((metaBola.getPuntosValidos().getMayorQue().getX()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            double mayorQuecmY=Math.round((metaBola.getPuntosValidos().getMayorQue().getY()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            System.out.println("Menor Que: "+metaBola.getPuntosValidos().getMenorQue().getX());
            double menorQuecmX=Math.round((metaBola.getPuntosValidos().getMenorQue().getX()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            double menorQuecmY=Math.round((metaBola.getPuntosValidos().getMenorQue().getY()*(2.54/ metaBola.getPpi()))*100.0)/100.0;
            pst.setString(4,"Mayor Que:("+mayorQuecmX+","+mayorQuecmY+"), Menor Que:("+menorQuecmX+","+menorQuecmY+")");
            double cm=metaBola.getDistanciaRespectoARespuestaMasCercana()*(2.54/metaBola.getPpi());
            pst.setString(5,Math.round(cm*100.0)/100.0+" cm");
            pst.setInt(6, metaBola.getNivel());
            pst.setDouble(7,metaBola.getPpi());
            pst.setString(8,metaBola.getUsuario());
            pst.executeUpdate();
        }
        catch (Exception e) {
            System.err.println("Error SQL al añadir en MetaBola:");
            System.err.println(e.getMessage());
        }
        finally {
            try {
                if(pst!=null)pst.close();
            }catch (SQLException e){
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body("Test Post de MetaBola Ejecutado");
    }
    @GetMapping(value ="/metaBola")
    public ResponseEntity<ArrayList<MetaBola>> testGetEstadisticasCarreraBola(){
        ArrayList<MetaBola> metaBolaList=new ArrayList<>();
        connectionBBDD();
        String sql="Select * from metaBola;";
        Statement st=null;
        ResultSet rs=null;
        try{
            st=connection.createStatement();
            rs=st.executeQuery(sql);
            while(rs.next()){
                String fila1=rs.getString("puntoPulsado").split(",")[0].split("\\(")[1];
                String columna1=rs.getString("puntoPulsado").split(",")[1].split("\\)")[0];
                Coordenadas coordenadas=new Coordenadas(Double.parseDouble(fila1),Double.parseDouble(columna1));
                double distancia=Double.parseDouble(rs.getString("distanciaRespectoAMeta").split("\\scm")[0]);
                String mayorQueString=rs.getString("puntosValidos").split(", Menor Que:\\(")[0].split("Mayor Que:\\(")[1];
                String menorQueString=rs.getString("puntosValidos").split(", Menor Que:\\(")[1];
                Coordenadas mayorQue=new Coordenadas(Double.parseDouble(mayorQueString.split(",")[0]),Double.parseDouble(mayorQueString.split(",")[1].substring(0,mayorQueString.split(",")[1].length()-1)));
                Coordenadas menorQue=new Coordenadas(Double.parseDouble(menorQueString.split(",")[0]),Double.parseDouble(menorQueString.split(",")[1].substring(0,menorQueString.split(",")[1].length()-1)));
                MetaBola metaBola=new MetaBola(rs.getInt("tiempo"),
                        rs.getString("usuario"),
                        rs.getBoolean("usuarioDetuvoLaBola"),
                        coordenadas,
                        new PuntosValidos(mayorQue,menorQue),
                        distancia,
                        rs.getDouble("ppi"),
                        rs.getInt("nivel")
                );
                metaBolaList.add(metaBola);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar MetaBola: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(metaBolaList);
    }

    //***************************************************************************************************************************************************************************************
    //-------------MOCA----------------------
    //***************************************************************************************************************************************************************************************
    @PostMapping(value ="/moca")
    public ResponseEntity<String> testPostMoca(@RequestBody MOCADatos moca){
        connectionBBDD();
        PreparedStatement pst = null;
        try {
            if (moca.getMoca1() != null) {

                String sql = "INSERT INTO moca_parte1(tiempo, dibujo,usuario ) " +
                        "VALUES(?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca1().getTiempo());
                Blob blobdata = connection.createBlob();
                blobdata.setBytes(1, moca.getMoca1().getDibujo().getBytes("UTF-8"));
                pst.setBlob(2, blobdata);
                pst.setString(3, moca.getMoca1().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca2() != null) {
                String sql = "INSERT INTO moca_parte2(tiempo, dibujoReloj,usuario ) " +
                        "VALUES(?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca2().getTiempo());
                Blob blobdata = connection.createBlob();
                blobdata.setBytes(1, moca.getMoca2().getDibujoReloj().getBytes("UTF-8"));
                pst.setBlob(2, blobdata);
                pst.setString(3, moca.getMoca2().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca3() != null) {
                String sql = "INSERT INTO moca_parte3(tiempo, imagenIzquierda,imagenCentro, imagenDerecha,usuario ) " +
                        "VALUES(?,?,?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca3().getTiempo());
                pst.setString(2,moca.getMoca3().getImageIzq());
                pst.setString(3,moca.getMoca3().getImageCentro());
                pst.setString(4,moca.getMoca3().getImageDer());
                pst.setString(5, moca.getMoca3().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca4() != null) {
                String sql = "INSERT INTO moca_parte4(tiempo, audio1,audio2,usuario ) " +
                        "VALUES(?,?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca4().getTiempo());
                Blob blobdata1 = connection.createBlob();
                blobdata1.setBytes(1, moca.getMoca4().getAudio1().getBytes("UTF-8"));
                pst.setBlob(2, blobdata1);
                Blob blobdata2 = connection.createBlob();
                blobdata2.setBytes(1, moca.getMoca4().getAudio2().getBytes("UTF-8"));
                pst.setBlob(3, blobdata2);
                pst.setString(4, moca.getMoca4().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca5() != null) {
                String sql = "INSERT INTO moca_parte5(tiempo, audio1,audio2,numeroDeAPulsadas,resta7_1,resta7_2,resta7_3,resta7_4,resta7_5,usuario ) " +
                        "VALUES(?,?,?,?,?,?,?,?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca5().getTiempo());
                Blob blobdata1 = connection.createBlob();
                blobdata1.setBytes(1, moca.getMoca5().getAudio1().getBytes("UTF-8"));
                pst.setBlob(2, blobdata1);
                Blob blobdata2 = connection.createBlob();
                blobdata2.setBytes(1, moca.getMoca5().getAudio2().getBytes("UTF-8"));
                pst.setBlob(3, blobdata2);
                pst.setInt(4,moca.getMoca5().getNumeroDeA());
                pst.setInt(5,moca.getMoca5().getResta7_1());
                pst.setInt(6,moca.getMoca5().getResta7_2());
                pst.setInt(7,moca.getMoca5().getResta7_3());
                pst.setInt(8,moca.getMoca5().getResta7_4());
                pst.setInt(9,moca.getMoca5().getResta7_5());
                pst.setString(10, moca.getMoca5().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca6() != null) {
                String sql = "INSERT INTO moca_parte6(tiempo, audio1,audio2,audio3,pareja1,pareja2, usuario) " +
                        "VALUES(?,?,?,?,?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca6().getTiempo());
                Blob blobdata1 = connection.createBlob();
                blobdata1.setBytes(1, moca.getMoca6().getAudio1().getBytes("UTF-8"));
                pst.setBlob(2, blobdata1);
                Blob blobdata2 = connection.createBlob();
                blobdata2.setBytes(1, moca.getMoca6().getAudio2().getBytes("UTF-8"));
                pst.setBlob(3, blobdata2);
                Blob blobdata3 = connection.createBlob();
                blobdata3.setBytes(1, moca.getMoca6().getAudio3().getBytes("UTF-8"));
                pst.setBlob(4, blobdata3);
                pst.setString(5,moca.getMoca6().getPareja1());
                pst.setString(6,moca.getMoca6().getPareja2());
                pst.setString(7, moca.getMoca6().getUsuario());
                pst.executeUpdate();
            }
            if (moca.getMoca7() != null) {
                String sql = "INSERT INTO moca_parte7(tiempo, palabra1, palabra2, palabra3, palabra4, palabra5," +
                        "pistaPalabra1, pistaPalabra2, pistaPalabra3, pistaPalabra4, pistaPalabra5, " +
                        "diaMes, mes, año, diaSemana, lugar, localidad, usuario) " +
                        "VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
                pst = connection.prepareStatement(sql);
                pst.setInt(1, (int) moca.getMoca7().getTiempo());
                pst.setString(2,moca.getMoca7().getPalabra1());pst.setString(3,moca.getMoca7().getPalabra2());
                pst.setString(4,moca.getMoca7().getPalabra3());pst.setString(5,moca.getMoca7().getPalabra4());
                pst.setString(6,moca.getMoca7().getPalabra5());
                pst.setBoolean(7,moca.getMoca7().isPistaPalabra1());pst.setBoolean(8,moca.getMoca7().isPistaPalabra2());
                pst.setBoolean(9,moca.getMoca7().isPistaPalabra3());pst.setBoolean(10,moca.getMoca7().isPistaPalabra4());
                pst.setBoolean(11,moca.getMoca7().isPistaPalabra5());
                pst.setString(12,moca.getMoca7().getDiames());
                pst.setString(13,moca.getMoca7().getMes());
                pst.setString(14,moca.getMoca7().getAño());
                pst.setString(15,moca.getMoca7().getDiaSemana());
                pst.setString(16,moca.getMoca7().getLugar());
                pst.setString(17,moca.getMoca7().getLocalidad());
                pst.setString(18, moca.getMoca7().getUsuario());
                pst.executeUpdate();
            }
        }catch (Exception e) {
            System.err.println("Error SQL al añadir en MOCA: ");
            System.err.println(e.getMessage());
        } finally {
            try {
                if (pst != null) pst.close();
            } catch (SQLException e) {
                System.err.println("Error al cerrar las estructuras: ");
                System.err.println(e.getMessage());
            }
        }
        //------------------Imagen-------------------
//        Base64.Decoder decoder = Base64.getDecoder();
//        byte[] decodedByte = decoder.decode(moca.getMoca1().getDibujo().split(",")[1]);
//        try {
//            FileOutputStream fileOutputStream=new FileOutputStream("dibujo.png");
//            fileOutputStream.write(decodedByte);
//            fileOutputStream.close();
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
        //-----------------------------------------
        //---------Audio
//        Base64.Decoder decoder = Base64.getDecoder();
//        byte[] decodedByte = decoder.decode(moca.getMoca4().getAudio2().split(",")[1]);
//        try {
//            FileOutputStream fileOutputStream=new FileOutputStream("audio.webm");
//            fileOutputStream.write(decodedByte);
//            fileOutputStream.close();
//        } catch (FileNotFoundException e) {
//            throw new RuntimeException(e);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

        return ResponseEntity.status(HttpStatus.OK).body("Test Post de MOCAS Ejecutado");
    }

    @GetMapping(value ="/moca")
    public ResponseEntity<ArrayList<MOCADatos>> testGetMOCA(){
        ArrayList<MOCADatos> mocaDatosList=new ArrayList<>();
        connectionBBDD();
        String sql1="Select * from moca_parte1;";
        String sql2="select m2.* from moca_parte2 m2 " +
                "inner join moca_parte1 m1 where m1.usuario=m2.usuario and m1.idMOCA_Parte1=m2.idMOCA_Parte2;";
        String sql3="select m3.* from moca_parte3 m3 " +
                "inner join moca_parte2 m2 where m2.usuario=m3.usuario and m2.idMOCA_Parte2=m3.idMOCA_Parte3;";
        String sql4="select m4.* from moca_parte4 m4 " +
                "inner join moca_parte3 m3 where m3.usuario=m4.usuario and m3.idMOCA_Parte3=m4.idMOCA_Parte4;";
        String sql5="select m5.* from moca_parte5 m5 " +
                "inner join moca_parte4 m4 where m4.usuario=m5.usuario and m4.idMOCA_Parte4=m5.idMOCA_Parte5;";
        String sql6="select m6.* from moca_parte6 m6 " +
                "inner join moca_parte5 m5 where m5.usuario=m6.usuario and m5.idMOCA_Parte5=m6.idMOCA_Parte6;";
        String sql7="select m7.* from moca_parte7 m7 " +
                "inner join moca_parte6 m6 where m6.usuario=m7.usuario and m6.idMOCA_Parte6=m7.idMOCA_Parte7;";
        Statement st1=null;Statement st2=null;Statement st3=null;Statement st4=null;
        Statement st5=null;Statement st6=null;Statement st7=null;
        ResultSet rs1=null;ResultSet rs2=null;ResultSet rs3=null;ResultSet rs4=null;
        ResultSet rs5=null;ResultSet rs6=null;ResultSet rs7=null;
        try{
            st1=connection.createStatement();st2=connection.createStatement();st3=connection.createStatement();st4=connection.createStatement();
            st5=connection.createStatement();st6=connection.createStatement();st7=connection.createStatement();
            rs1=st1.executeQuery(sql1);rs2=st2.executeQuery(sql2);rs3=st3.executeQuery(sql3);rs4=st4.executeQuery(sql4);
            rs5=st5.executeQuery(sql5);rs6=st6.executeQuery(sql6);rs7=st7.executeQuery(sql7);
            while(rs1.next()) {
                MOCA1 moca1 = null; MOCA2 moca2 = null; MOCA3 moca3 = null; MOCA4 moca4 = null; MOCA5 moca5 = null; MOCA6 moca6 = null; MOCA7 moca7 = null;
                if (rs1.getString("usuario") != null) {
                    moca1 = new MOCA1(rs1.getString("usuario"),
                            rs1.getInt("tiempo"),
                            new String(rs1.getBlob("dibujo").getBytes(1, (int) rs1.getBlob("dibujo").length()))
                    );
                }
                if (rs2.next()) {
                    moca2 = new MOCA2(rs2.getString("usuario"),
                            rs2.getInt("tiempo"),
                            new String(rs2.getBlob("dibujoReloj").getBytes(1, (int) rs2.getBlob("dibujoReloj").length()))
                    );
                }
                if (rs3.next()){
                    moca3 = new MOCA3(rs3.getString("usuario"),
                            rs3.getInt("tiempo"),
                            rs3.getString("imagenIzquierda"),
                            rs3.getString("imagenCentro"),
                            rs3.getString("imagenDerecha")
                    );
                }
                if(rs4.next()) {
                    moca4 = new MOCA4(rs4.getString("usuario"),
                            rs4.getInt("tiempo"),
                            new String(rs4.getBlob("audio1").getBytes(1, (int) rs4.getBlob("audio1").length())),
                            new String(rs4.getBlob("audio2").getBytes(1, (int) rs4.getBlob("audio2").length()))
                    );
                }
                if(rs5.next()) {
                    moca5 = new MOCA5(rs5.getString("usuario"),
                            rs5.getInt("tiempo"),
                            new String(rs5.getBlob("audio1").getBytes(1, (int) rs5.getBlob("audio1").length())),
                            new String(rs5.getBlob("audio2").getBytes(1, (int) rs5.getBlob("audio2").length())),
                            rs5.getInt("numeroDeAPulsadas"),
                            rs5.getInt("resta7_1"), rs5.getInt("resta7_2"), rs5.getInt("resta7_3"),
                            rs5.getInt("resta7_4"), rs5.getInt("resta7_5")
                    );
                }
                if(rs6.next()) {
                    moca6 = new MOCA6(rs6.getString("usuario"),
                            rs6.getInt("tiempo"),
                            new String(rs6.getBlob("audio1").getBytes(1, (int) rs6.getBlob("audio1").length())),
                            new String(rs6.getBlob("audio2").getBytes(1, (int) rs6.getBlob("audio2").length())),
                            new String(rs6.getBlob("audio3").getBytes(1, (int) rs6.getBlob("audio3").length())),
                            rs6.getString("pareja1"),
                            rs6.getString("pareja2")
                    );
                }
                if(rs7.next()) {
                    moca7 = new MOCA7(rs7.getString("usuario"),
                            rs7.getInt("tiempo"),
                            rs7.getString("palabra1"), rs7.getString("palabra2"),
                            rs7.getString("palabra3"), rs7.getString("palabra4"),
                            rs7.getString("palabra5"),
                            rs7.getBoolean("pistaPalabra1"), rs7.getBoolean("pistaPalabra2"),
                            rs7.getBoolean("pistaPalabra3"), rs7.getBoolean("pistaPalabra4"),
                            rs7.getBoolean("pistaPalabra5"),
                            rs7.getString("diaMes"),
                            rs7.getString("mes"),
                            rs7.getString("año"),
                            rs7.getString("diaSemana"),
                            rs7.getString("lugar"),
                            rs7.getString("localidad")
                    );
                }
                MOCADatos mocaDatos=new MOCADatos(moca1,moca2,moca3,moca4,moca5,moca6,moca7);
                mocaDatosList.add(mocaDatos);
            }
        }
        catch (Exception e){
            System.err.println("Error al consultar MOCA: ");
            System.err.println(e.getMessage());
        }
        return ResponseEntity.status(HttpStatus.OK).body(mocaDatosList);
    }
    public boolean connectionBBDD(){
        try{
            if(connection == null || connection.isClosed()){
                String serverAddress = "localhost:3306";													//Parámetros para conectarse a la base de datos
                String db = "webappbbdd";
                String user = "root";
                String pass = "";
                String url = "jdbc:mysql://" + serverAddress + "/" + db;
                connection = DriverManager.getConnection(url, user, pass);										//Conexión a la base de datos
                return true;
            }
        }
            catch (SQLException e){
            System.err.println("Error al abrir la conexión: ");
            System.err.println(e.getMessage());
        }
            return false;
    }
}
