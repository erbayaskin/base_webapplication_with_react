package com.erbayaskin.basicBackend.aspect;

import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
@Log4j2
public class LogsAspectService {


    @Before("execution(* com.erbayaskin.basicBackend.controllers.*.*(..))")
    public void consoleRequest(JoinPoint joinPoint){
        String user = "";
        if(SecurityContextHolder.getContext().getAuthentication()!=null)
            user = " user : "+ SecurityContextHolder.getContext().getAuthentication().getName()+" "+
                    SecurityContextHolder.getContext().getAuthentication().getDetails().toString();

        log.info("Before. "+ user + joinPoint.getSignature().toString()+ createJoinPointForLogs(joinPoint,DataType.REQUEST));
        //log.info("Before. "+ user );

    }

    @AfterReturning(value = "execution(* com.erbayaskin.basicBackend.controllers.*.*(..))",returning = "retVal")
    public void logsResponse(JoinPoint joinPoint,Object retVal){
        String user = "";
        if(SecurityContextHolder.getContext().getAuthentication()!=null)
            user = "AfterReturning. user : "+ SecurityContextHolder.getContext().getAuthentication().getName()+" "+
                    SecurityContextHolder.getContext().getAuthentication().getDetails().toString();

        // for log the controller name
        String response = null;
        if(retVal!=null && retVal.toString()!=null && !(retVal instanceof String))
            response = retVal.toString();
        log.info("AfterReturning. "+ user + joinPoint.getSignature().toString()+((response!=null)?("\n response : "+ response):""));
        //log.info("AfterReturning. "+user + createJoinPointForLogs(joinPoint,DataType.RESPONSE));
    }

    /**
     * This method will print
     * @param joinPoint we can find inside it all the details of the method called inside the join point
     * @param exception from here we can know more details about the exception like exception type and exception message
     */
    @AfterThrowing(value = "execution(* com.erbayaskin.basicBackend.controllers.*.*(..))" ,throwing = "exception")
    public void logsErrors(JoinPoint joinPoint, Throwable exception){
        String user = "";
        if(SecurityContextHolder.getContext().getAuthentication()!=null)
            user = "user : "+ SecurityContextHolder.getContext().getAuthentication().getName()+" "+
                    SecurityContextHolder.getContext().getAuthentication().getDetails().toString();


//        log.info("AfterThrowing. "+user + "========================== We have Error here ==========================");
        // for log the controller name
        log.info("AfterThrowing. "+user + joinPoint.getSignature().toString()+ exception.getMessage());
        // for know what the exception message
//        log.info("AfterThrowing. "+user + exception.getMessage());
//        log.info("AfterThrowing. "+user + "==========================================================================");
    }

    /**
     *
     * @param joinPoint we need to use it to see attributes in the original method
     * @return will return String after building all the attributes
     */

    private String createJoinPointForLogs(JoinPoint joinPoint, DataType dataType) {
        /**
         * the joinPoint has arguments from the controller,
         * but we can see the args will receive here as an Array we need to check the length of it before making any Operations.
         */
        if (joinPoint.getArgs().length < 1) {
            return joinPoint.getSignature().getName()
                    .concat(" method don`t have parameters");
        }
        Object[] obj = joinPoint.getArgs();
        StringBuilder requestValue = new StringBuilder();
        if(dataType.equals(DataType.REQUEST)){
            requestValue.append("\r\n========== The request values ==========");
        }
        else {
            requestValue.append("\r\n========== The response values ==========");
        }
        Arrays.stream(obj).forEach(x -> {
            requestValue.append("\r\n");
            requestValue.append(x.toString());
        });
        requestValue
                .append("\r\n============= ======="
                        + "====== =============");
        return requestValue.toString();
    }
}
