export const validateDto = (dtoClass) => {

    //Note: Regardless of where 'next' is, we must pass the req somewhere
    return (req, res, next) => {
        try {
            const dto = new dtoClass(req.body);
            dto.validate();
            req.body = dto;

            next(); //-->controller

        } catch (error) {
            next(error); //Global error handler
        }
    }
}