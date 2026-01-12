'use client'

import { Box, Container, Paper, Typography, useTheme } from '@mui/material'

const PrivacyPolicyPage = () => {
    const theme = useTheme()

    return (
        <Container maxWidth='lg' className="py-10">
            <Paper elevation={3} className="p-8 md:p-12 rounded-xl">
                <Typography variant='h3' component='h1' className="mb-8 font-bold text-center text-primary">
                    POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES
                </Typography>

                <Typography variant='subtitle1' className="text-center mb-2 font-semibold">
                    RTMS (Racquet Tournament Management System)
                </Typography>

                <Typography variant='subtitle2' className="text-center mb-8 text-gray-500">
                    Fecha de última actualización: 10 de Enero de 2026
                </Typography>

                <Box className="flex flex-col gap-6 text-justify">

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            1. Introducción
                        </Typography>
                        <Typography variant='body1'>
                            La presente Política de Tratamiento de Datos Personales establece los términos y condiciones bajo los cuales RTMS (en adelante, “la Plataforma”) realiza la recolección, almacenamiento, uso, circulación, publicación y demás formas de tratamiento de datos personales proporcionados por los usuarios que participan o se inscriben en los torneos u otros servicios ofrecidos por la Plataforma.
                        </Typography>
                        <Typography variant='body1' className="mt-2">
                            El usuario, al aceptar esta política, autoriza el tratamiento de su información personal conforme a lo aquí descrito.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            2. Responsable del Tratamiento
                        </Typography>
                        <ul className="list-none space-y-1 pl-4">
                            <li><Typography variant='body1'><strong>Responsable:</strong> RTMS</Typography></li>
                            <li><Typography variant='body1'><strong>Dirección:</strong> [Dirección]</Typography></li>
                            <li><Typography variant='body1'><strong>Correo electrónico:</strong> [Email oficial]</Typography></li>
                            <li><Typography variant='body1'><strong>País:</strong> [País]</Typography></li>
                            <li><Typography variant='body1'><strong>Teléfono:</strong> [Número]</Typography></li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            3. Datos personales recolectados
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Para la inscripción, participación y gestión de los torneos, la Plataforma podrá solicitar los siguientes tipos de datos:
                        </Typography>

                        <Box className="pl-4 space-y-4">
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">Datos de identificación:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Nombres y apellidos</li>
                                    <li className="MuiTypography-body1">Documento de identidad (tipo y número)</li>
                                    <li className="MuiTypography-body1">Fecha de nacimiento</li>
                                    <li className="MuiTypography-body1">Nacionalidad</li>
                                    <li className="MuiTypography-body1">Información de contacto (email, teléfono)</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">Datos de perfil público:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Alias o nombre deportivo</li>
                                    <li className="MuiTypography-body1">Foto de perfil</li>
                                    <li className="MuiTypography-body1">Redes sociales (Instagram, Facebook, LinkedIn)</li>
                                    <li className="MuiTypography-body1">Biografía y descripciones personales</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">Datos de ubicación y dirección:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">País, estado, ciudad</li>
                                    <li className="MuiTypography-body1">Dirección (parcial o completa según necesidad)</li>
                                    <li className="MuiTypography-body1">Código postal</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">Datos deportivos/competitivos:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Mano dominante (handedness)</li>
                                    <li className="MuiTypography-body1">Altura, peso</li>
                                    <li className="MuiTypography-body1">Estadísticas, desempeño e historial competitivo</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">Datos de contacto de emergencia:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Nombre y relación</li>
                                    <li className="MuiTypography-body1">Teléfono y datos básicos</li>
                                </ul>
                            </div>
                        </Box>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            4. Finalidades del tratamiento
                        </Typography>
                        <Typography variant='body1' paragraph>
                            La información personal será tratada para las siguientes finalidades:
                        </Typography>

                        <Box className="pl-4 space-y-4">
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">4.1 Finalidades esenciales para el servicio</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Inscripción del usuario a torneos</li>
                                    <li className="MuiTypography-body1">Verificación de datos y elegibilidad</li>
                                    <li className="MuiTypography-body1">Administración de perfiles de jugador</li>
                                    <li className="MuiTypography-body1">Comunicación sobre eventos, horarios, reglas y notificaciones operativas</li>
                                    <li className="MuiTypography-body1">Gestión de resultados, estadísticas y desempeño</li>
                                    <li className="MuiTypography-body1">Prevención de fraude y seguridad del sistema</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">4.2 Finalidades de publicación y visibilidad</Typography>
                                <Typography variant='body2' className="mb-1 italic">Mostrar información no sensible sobre el jugador en:</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">listados de jugadores inscritos</li>
                                    <li className="MuiTypography-body1">rankings</li>
                                    <li className="MuiTypography-body1">fichas públicas de perfil</li>
                                    <li className="MuiTypography-body1">resultados y estadísticas</li>
                                    <li className="MuiTypography-body1">cuadros de torneos</li>
                                    <li className="MuiTypography-body1">Permitir la interacción y visibilidad normal entre jugadores y espectadores</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">4.3 Finalidades estadísticas y analíticas</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Análisis de métricas generales</li>
                                    <li className="MuiTypography-body1">Elaboración de reportes de participación</li>
                                    <li className="MuiTypography-body1">Optimización de eventos y torneos</li>
                                    <li className="MuiTypography-body1">Estudios no individualizados de tendencias competitivas</li>
                                </ul>
                            </div>
                            <div>
                                <Typography variant='subtitle1' className="font-semibold">4.4 Finalidades comerciales y comunicacionales</Typography>
                                <ul className="list-disc pl-6">
                                    <li className="MuiTypography-body1">Envío de información relevante sobre nuevos torneos o servicios</li>
                                    <li className="MuiTypography-body1">Boletines informativos (opt-in independiente si aplica en el futuro)</li>
                                </ul>
                            </div>
                        </Box>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            5. Publicación de Información Personal No Sensible
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Como parte integral del tratamiento de datos personales y para asegurar el funcionamiento de la plataforma, el usuario autoriza la publicación, visualización y divulgación de información personal no sensible dentro de la Plataforma y sus medios asociados.
                        </Typography>
                        <Typography variant='body1' paragraph>
                            Esta divulgación comprende únicamente datos que no comprometen la seguridad o privacidad del usuario y que son necesarios para su participación en torneos.
                        </Typography>
                        <Typography variant='body1'>Se considera información no sensible y publicable:</Typography>
                        <ul className="list-disc pl-6 mb-4">
                            <li className="MuiTypography-body1">Nombre, alias o nombre deportivo</li>
                            <li className="MuiTypography-body1">Nacionalidad</li>
                            <li className="MuiTypography-body1">Foto de perfil</li>
                            <li className="MuiTypography-body1">Redes sociales públicas</li>
                            <li className="MuiTypography-body1">Estadísticas y resultados deportivos</li>
                            <li className="MuiTypography-body1">Biografía, descripciones o información voluntariamente aportada</li>
                            <li className="MuiTypography-body1">Datos de participación en torneos</li>
                        </ul>
                        <Typography variant='body1' paragraph>
                            Esta autorización es obligatoria para usar los servicios de la Plataforma.
                            Si el usuario no acepta esta divulgación, no será posible inscribirlo en torneos ni mostrar su participación al público.
                        </Typography>
                        <Typography variant='body1'>Nunca se publicará información sensible, como:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">Documento de identidad completo</li>
                            <li className="MuiTypography-body1">Dirección exacta</li>
                            <li className="MuiTypography-body1">Fecha de nacimiento completa (si se muestra, será parcial)</li>
                            <li className="MuiTypography-body1">Datos financieros</li>
                            <li className="MuiTypography-body1">Datos personales de contacto (email, teléfono)</li>
                            <li className="MuiTypography-body1">Información de emergencia</li>
                            <li className="MuiTypography-body1">Cualquier otro dato que comprometa la seguridad del usuario</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            6. Datos sensibles
                        </Typography>
                        <Typography variant='body1'>
                            La Plataforma no solicita ni trata datos sensibles, excepto cuando por error el usuario los aporte en campos de texto libre, caso en el cual serán eliminados.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            7. Derechos del titular de los datos
                        </Typography>
                        <Typography variant='body1'>El usuario tiene derecho a:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">Acceder a sus datos personales</li>
                            <li className="MuiTypography-body1">Actualizar o rectificar información</li>
                            <li className="MuiTypography-body1">Solicitar la eliminación de datos cuando no exista obligación legal de conservarlos</li>
                            <li className="MuiTypography-body1">Revocar la autorización de tratamiento cuando sea posible</li>
                            <li className="MuiTypography-body1">Conocer los usos aplicados a sus datos</li>
                            <li className="MuiTypography-body1">Presentar quejas ante la autoridad de protección de datos de su país</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            8. Conservación de la información
                        </Typography>
                        <Typography variant='body1'>Los datos serán conservados por el tiempo necesario para cumplir con:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">la relación entre el usuario y la Plataforma</li>
                            <li className="MuiTypography-body1">obligaciones legales</li>
                            <li className="MuiTypography-body1">auditorías y reportes históricos de torneos</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            9. Transferencias y transmisiones
                        </Typography>
                        <Typography variant='body1'>La Plataforma podrá compartir información con:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">Aliados operativos</li>
                            <li className="MuiTypography-body1">Organizadores locales de eventos</li>
                            <li className="MuiTypography-body1">Proveedores de infraestructura tecnológica</li>
                            <li className="MuiTypography-body1">Servicios de análisis estadístico</li>
                        </ul>
                        <Typography variant='body1' className="mt-2">
                            Siempre bajo acuerdos de confidencialidad y cumpliendo la normativa vigente.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            10. Seguridad de la información
                        </Typography>
                        <Typography variant='body1'>Se implementan medidas técnicas, humanas y administrativas para proteger la información contra:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">acceso no autorizado</li>
                            <li className="MuiTypography-body1">pérdida o modificación</li>
                            <li className="MuiTypography-body1">divulgación indebida</li>
                            <li className="MuiTypography-body1">ciberataques</li>
                        </ul>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            11. Uso de cookies y tecnologías similares
                        </Typography>
                        <Typography variant='body1'>La Plataforma podrá emplear cookies con fines de:</Typography>
                        <ul className="list-disc pl-6">
                            <li className="MuiTypography-body1">funcionamiento esencial</li>
                            <li className="MuiTypography-body1">analítica</li>
                            <li className="MuiTypography-body1">seguridad</li>
                        </ul>
                        <Typography variant='body1' className="mt-2">
                            El usuario puede administrarlas desde su navegador.
                        </Typography>
                    </section>

                    <section>
                        <Typography variant='h5' component='h2' className="mb-4 font-semibold">
                            12. Modificaciones a esta política
                        </Typography>
                        <Typography variant='body1'>
                            La Plataforma podrá modificar esta política de privacidad en cualquier momento.
                            Las actualizaciones serán publicadas en el sitio web y entrarán en vigencia desde su fecha de publicación.
                        </Typography>
                    </section>

                </Box>
            </Paper>
        </Container>
    )
}

export default PrivacyPolicyPage
